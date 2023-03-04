/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActionIcon, Text, TextInput } from '@mantine/core';
import { BsCheck2, BsX } from 'react-icons/bs';
import { useAppDispatch } from '../../hooks';
import { updateCardBrief } from './stores/cards.slice';

type CardBriefEditFormProps = {
  cardId: string;
  cardBrief: string;
  setCardBriefEditFormOpened: (value: SetStateAction<boolean>) => void;
};

type Inputs = {
  brief: string;
};

function CardBriefEditForm({
  cardId,
  cardBrief,
  setCardBriefEditFormOpened,
}: CardBriefEditFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      brief: cardBrief,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    dispatch(updateCardBrief({ id: cardId, newBrief: formData.brief }));
    setCardBriefEditFormOpened(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <TextInput
        css={{ flexGrow: 1 }}
        aria-label="card brief"
        size="xl"
        {...register('brief', { required: true })}
      />
      {errors.brief?.type === 'required' && (
        <Text size="sm" color="red">
          Cards must have a brief
        </Text>
      )}
      <ActionIcon
        type="submit"
        radius="xl"
        variant="filled"
        color="blue"
        css={{ marginLeft: '20px' }}
      >
        <BsCheck2 />
      </ActionIcon>
      <ActionIcon
        type="submit"
        radius="xl"
        variant="light"
        color="red"
        css={{ marginLeft: '20px' }}
      >
        <BsX />
      </ActionIcon>
    </form>
  );
}

export default CardBriefEditForm;
