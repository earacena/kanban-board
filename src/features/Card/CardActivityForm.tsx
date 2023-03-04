/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button, Stack, Text,
} from '@mantine/core';
import { sortableItemStyle } from '../Column/styles/column.styles';
import { useAppDispatch } from '../../hooks';
import { addCardActivity } from './stores/cards.slice';

type Inputs = {
  content: string;
};

type CardActivityProps = {
  cardId: string;
};

function CardActivityForm({ cardId }: CardActivityProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ content }) => {
    dispatch(
      addCardActivity({
        cardId,
        type: 'contribution',
        content,
      }),
    );

    reset({
      content: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={{ display: 'flex', flexDirection: 'column' }}>
      <Stack>
        <textarea
          style={
            {
              ...sortableItemStyle,
              fontFamily: 'Open Sans',
              flexGrow: 1,
              resize: 'none',
              marginBottom: '0',
            } as React.CSSProperties
          }
          aria-label="activity content"
          placeholder="How have you contributed towards this task?"
          {...register('content', { required: true })}
        />
        <Text size="sm" color="red" align="center" css={{ marginTop: '0' }}>
          {errors.content?.type === 'required'
            ? 'Activity posts must have content'
            : null}
        </Text>
      </Stack>
      <Button radius="xl" type="submit" css={{ marginRight: '5px', alignSelf: 'flex-end' }}>
        Post
      </Button>
    </form>
  );
}

export default CardActivityForm;
