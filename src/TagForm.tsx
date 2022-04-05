/** @jsxRuntime classic */
import React, { useState } from 'react';
import { Modal, Popover } from '@mantine/core';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { HexColorPicker } from 'react-colorful';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoIosColorPalette } from 'react-icons/io';
import { useAppDispatch } from './hooks';
import { addTag } from './tag.slice';

type Inputs = {
  label: string,
};

interface TagFormProps {
  tagFormOpened: boolean,
  setTagFormOpened: (values: React.SetStateAction<boolean>) => void,
}

function TagForm({ tagFormOpened, setTagFormOpened }: TagFormProps) {
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
      label: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { label } = formData;
    dispatch(
      addTag({
        label,
        color,
      }),
    );
    reset({
      label: '',
    });
    setTagFormOpened(false);
  };

  return (
    <Modal
      opened={tagFormOpened}
      onClose={() => setTagFormOpened(false)}
      title="Add a new tag"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="tag-label-input">
          Label
          {errors.label?.type === 'required' && <span css={{ color: 'red' }}>Label is required</span>}
          <input id="tag-label-input" {...register('label', { required: true })} />
        </label>
        <Popover
          opened={colorPickerOpened}
          onClose={() => setColorPickerOpened(false)}
          target={(
            <button css={{ alignSelf: 'center' }} type="button" onClick={() => setColorPickerOpened(!colorPickerOpened)}>
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
    </Modal>
  );
}

export default TagForm;
