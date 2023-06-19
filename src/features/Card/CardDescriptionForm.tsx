/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Group, Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCard, updateCardBody } from './stores/cards.slice';
import cardServices from '../../services/card.service';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';

type CardDescriptionFormProps = {
  id: string,
  cardBody: string | undefined,
  setCardDescriptionFormOpened: (value: SetStateAction<boolean>) => void,
};

type Inputs = {
  body: string,
};

function CardDescriptionForm({
  id,
  cardBody,
  setCardDescriptionFormOpened,
}:CardDescriptionFormProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);
  const allCards = useAppSelector((state) => state.cards.allCards);
  const card = allCards.find((c) => c.id === id);

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      body: cardBody,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    if (session && card) {
      try {
        const updatedCard = await cardServices.update({
          cardId: id,
          changes: {
            ...card,
            body: formData.body,
          },
        });
        dispatch(updateCard({ updatedCard }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    } else {
      dispatch(updateCardBody({ id, newBody: formData.body }));
    }
    setCardDescriptionFormOpened(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={{
        margin: '40px',
        marginTop: '20px',
      }}
    >
      <Stack>
        <textarea
          placeholder="Give this card a more detailed description..."
          aria-label="card description form"
          css={{
            fontFamily: 'Open Sans',
            padding: '10px',
            borderRadius: '10px',
            border: '1px gray solid',
            resize: 'none',
            height: '300px',
            fontWeight: '300',
          }}
          {...register('body')}
        />
        <Group>
          <Button radius="xl" type="submit">
            Save
          </Button>
          <Button variant="outline" radius="xl" type="button" onClick={() => setCardDescriptionFormOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default CardDescriptionForm;
