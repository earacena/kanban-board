/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { SetStateAction } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { Button, Text } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  cardFormButtonStyle,
  sortableItemStyle,
} from '../Column/styles/column.styles';
import { useAppDispatch } from '../../hooks';
import { addCard } from './stores/cards.slice';

type CardFormProps = {
  columnId: string;
  setCardFormOpened: (value: SetStateAction<boolean>) => void;
};

type CardFormInputs = {
  brief: string;
};

function CardForm({ columnId, setCardFormOpened }: CardFormProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormInputs>({
    defaultValues: {
      brief: '',
    },
  });

  const onSubmit: SubmitHandler<CardFormInputs> = (formData) => {
    const { brief } = formData;

    dispatch(
      addCard({
        brief,
        columnId,
        body: undefined,
        color: undefined,
        tags: [],
      }),
    );

    reset({
      brief: '',
    });
  };
  return (
    <form
      css={css({ display: 'flex', flexDirection: 'column' })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        style={{
          ...sortableItemStyle,
          fontFamily: 'Open Sans',
          flexGrow: 1,
          resize: 'none',
        } as React.CSSProperties}
        aria-label="card brief textarea"
        {...register('brief', { required: true })}
      />
      <Text color="red" size={14}>
        {errors.brief?.type === 'required'
          ? 'Cards must have a brief description'
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
        onClick={() => setCardFormOpened(false)}
      >
        CANCEL
      </Button>
    </form>
  );
}

export default CardForm;
