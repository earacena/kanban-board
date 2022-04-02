/** @jsxRuntime classic */
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm, SubmitHandler } from 'react-hook-form';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Modal } from '@mantine/core';
import { addCard } from './cards.slice';
import { useAppDispatch } from './hooks';

type Inputs = {
  brief: string,
  body: string,
};

interface CardFormProps {
  cardFormOpened: boolean;
  setCardFormOpened: (value: React.SetStateAction<boolean>) => void;
  columnId: string;
}

function CardForm({ cardFormOpened, setCardFormOpened, columnId }: CardFormProps) {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#aabbcc');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      brief: '',
      body: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    const { brief, body } = formData;
    dispatch(
      addCard({
        brief,
        body,
        columnId,
        color,
      }),
    );
    reset({
      brief: '',
      body: '',
    });
    setCardFormOpened(false);
  };

  return (
    <Modal
      opened={cardFormOpened}
      onClose={() => setCardFormOpened(false)}
      title="Create a card"
    >
      <form css={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
        Create a new card
        <label htmlFor="card-brief-input">
          Brief
          {errors.brief?.type === 'required' && <span css={{ color: 'red' }}>Cards must have a label</span>}
          <input
            id="card-brief-input"
            type="text"
            placeholder="Enter a brief description of the card..."
            {...register('brief', { required: true })}
          />
        </label>
        <label htmlFor="card-body-textarea">
          Body
          {errors.body?.type === 'required' && <span css={{ color: 'red' }}>Cards must have a label</span>}
          <textarea
            id="card-body-textarea"
            placeholder=""
            {...register('body', { required: true })}
          />
        </label>

        <HexColorPicker color={color} onChange={setColor} />

        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={() => setCardFormOpened(false)}>Cancel</button>
    </Modal>
  );
}

export default CardForm;
