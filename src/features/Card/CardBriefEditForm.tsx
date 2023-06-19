/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActionIcon, Text, TextInput } from '@mantine/core';
import { BsCheck2, BsX } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCard, updateCardBrief } from './stores/cards.slice';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import cardServices from '../../services/card.service';

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
  const session = useAppSelector((state) => state.auth.user);
  const allCards = useAppSelector((state) => state.cards.allCards);
  const card = allCards.find((c) => c.id === cardId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      brief: cardBrief,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (session && card) {
      try {
        const updatedCard = await cardServices.update({
          cardId,
          changes: {
            ...card,
            brief: formData.brief,
          },
        });
        dispatch(updateCard({ updatedCard }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    } else {
      dispatch(updateCardBrief({ id: cardId, newBrief: formData.brief }));
    }

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
