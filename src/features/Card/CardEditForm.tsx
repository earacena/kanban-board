import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button, Modal, Textarea } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { updateCardBriefBody } from './stores/cards.slice';
import { cardEditFormStyle } from './styles/cardEditForm.styles';

interface CardEditFormProps {
  id: string,
  cardBrief: string;
  cardBody: string | undefined;
  cardEditFormOpened: boolean;
  setCardEditFormOpened: (value: React.SetStateAction<boolean>) => void;
}

type Inputs = {
  brief: string,
  body: string,
};

function CardEditForm({
  id,
  cardBrief,
  cardBody,
  cardEditFormOpened,
  setCardEditFormOpened,
}: CardEditFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      brief: cardBrief,
      body: cardBody,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ brief, body }) => {
    dispatch(updateCardBriefBody({ id, newBrief: brief, newBody: body }));

    reset({
      brief: '',
      body: '',
    });

    setCardEditFormOpened(false);
  };

  return (
    <Modal
      opened={cardEditFormOpened}
      onClose={() => setCardEditFormOpened(false)}
      title="Edit card"
    >
      <form css={cardEditFormStyle} onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          css={{ marginBottom: '0.5rem' }}
          placeholder="Write a brief sentence about the task..."
          label="Brief description"
          aria-label="card-edit-brief-textarea"
          error={errors.brief?.type === 'required' ? 'Cards must have a brief description' : null}
          {...register('brief', { required: true })}
          maxRows={2}
        />

        <Textarea
          css={{ marginBottom: '0.5rem' }}
          placeholder="Write about the task in more detail..."
          label="Detailed description"
          aria-label="card-edit-body-textarea"
          {...register('body')}
          autosize
          minRows={4}
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
}

export default CardEditForm;
