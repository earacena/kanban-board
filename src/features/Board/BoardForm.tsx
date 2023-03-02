/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { cardFormButtonStyle, sortableItemStyle } from '../Column/styles/column.styles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addBoard, setSelectedBoard } from './stores/boards.slice';

type Inputs = {
  label: string;
};

type BoardFormProps = {
  setBoardFormOpened: (value: SetStateAction<boolean>) => void;
};

function BoardForm({ setBoardFormOpened }: BoardFormProps) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.allBoards);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      label: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { label } = formData;

    dispatch(
      addBoard({
        label,
      }),
    );

    dispatch(
      setSelectedBoard({ boardId: boards[boards.length - 1].id }),
    );

    reset({
      label: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <textarea
        style={{
          ...sortableItemStyle,
          fontFamily: 'Open Sans',
          flexGrow: 1,
          resize: 'none',
          width: '100%',
          height: '30px',
        } as React.CSSProperties}
        aria-label="board label"
        {...register('label', { required: true })}
      />
      <Text color="red" size={14}>
        {errors.label?.type === 'required'
          ? 'Boards must have a label'
          : null}
      </Text>
      <Button
        css={cardFormButtonStyle}
        type="submit"
        leftIcon={<BsPlus size={19} />}
      >
        ADD NEW CARD
      </Button>
      <Button
        variant="subtle"
        color="red"
        leftIcon={<FcCancel size={19} />}
        onClick={() => setBoardFormOpened(false)}
      >
        CANCEL
      </Button>
    </form>
  );
}

export default BoardForm;
