/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { v4 as uuidv4 } from 'uuid';

import { cardFormButtonStyle, sortableItemStyle } from '../Column/styles/column.styles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addBoard } from './stores/boards.slice';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import boardServices from '../../services/board.service';

type Inputs = {
  label: string;
};

type BoardFormProps = {
  setBoardFormOpened: (value: SetStateAction<boolean>) => void;
};

function BoardForm({ setBoardFormOpened }: BoardFormProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      label: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      if (session) {
        const newBoard = await boardServices.create({
          userId: session.id,
          label: formData.label,
        });

        dispatch(addBoard({ board: newBoard }));
      } else {
        dispatch(addBoard({
          board: {
            id: uuidv4(),
            label: formData.label,
            userId: uuidv4(),
            dateCreated: new Date().toISOString(),
          },
        }));
      }

      reset({ label: '' });
    } catch (err: unknown) {
      const decoded = ErrorType.parse(err);
      logger.logError(decoded);
    }
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
        ADD NEW BOARD
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
