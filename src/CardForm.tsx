/** @jsxRuntime classic */
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm, SubmitHandler } from 'react-hook-form';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Modal, Popover } from '@mantine/core';
import { IoIosColorPalette } from 'react-icons/io';
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
  const [colorPickerOpened, setColorPickerOpened] = useState(false);
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
      <form css={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="card-brief-textarea">
          Brief
          {errors.brief?.type === 'required' && <span css={{ color: 'red' }}>Cards must have a label</span>}
          <textarea
            css={{
              resize: 'none',
              width: '100%',
              height: '50px',
            }}
            id="card-brief-textarea"
            placeholder="Write a brief sentence about the task..."
            {...register('brief', { required: true })}
          />
        </label>
        <label htmlFor="card-body-textarea">
          Body
          {errors.body?.type === 'required' && <span css={{ color: 'red' }}>Cards must have a label</span>}
          <textarea
            css={{
              resize: 'none',
              width: '100%',
              height: '200px',
            }}
            id="card-body-textarea"
            placeholder="Write about the task in more detail..."
            {...register('body', { required: true })}
          />
        </label>

        <Popover
          opened={colorPickerOpened}
          onClose={() => setColorPickerOpened(false)}
          target={(
            <button type="button" onClick={() => setColorPickerOpened(!colorPickerOpened)}>
              <IoIosColorPalette />
              Pick a color
            </button>
          )}
          position="bottom"
          placement="center"
          shadow="md"
          closeOnClickOutside
          withCloseButton
          withArrow
        >
          <HexColorPicker css={{ alignSelf: 'center', margin: '1rem' }} color={color} onChange={setColor} />
        </Popover>

        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={() => setCardFormOpened(false)}>Cancel</button>
    </Modal>
  );
}

export default CardForm;
