import React, { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Group } from '@mantine/core';
import { useAppDispatch } from '../../hooks';
import { updateCardBody } from './stores/cards.slice';

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

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      body: cardBody,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
    dispatch(updateCardBody({ id, newBody: formData.body }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="Give this card a more detailed description..."
        aria-label="card description form"
        {...register('body')}
      />
      <Group>
        <Button radius="xl" type="submit" onClick={() => setCardDescriptionFormOpened(false)}>
          Save
        </Button>
        <Button variant="outline" radius="xl" type="button" onClick={() => setCardDescriptionFormOpened(false)}>
          Cancel
        </Button>
      </Group>
    </form>
  );
}

export default CardDescriptionForm;
