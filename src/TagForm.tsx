/** @jsxRuntime classic */
import React, { useState } from 'react';
import {
  Modal,
  useMantineTheme,
  ColorInput,
  TextInput,
} from '@mantine/core';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  const theme = useMantineTheme();
  const colorSwatches = Object.keys(theme.colors).map((color) => theme.colors[color][6]);
  const [color, setColor] = useState('#aabbcc');

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
    let pickedColor: string;
    const colorNames = new Map()
      .set('#25262b', 'black')
      .set('#868e96', 'gray')
      .set('#fa5252', 'red')
      .set('#e64980', 'pink')
      .set('#be4bdb', 'grape')
      .set('#7950f2', 'violet')
      .set('#4c6ef5', 'indigo')
      .set('#228ae6', 'blue')
      .set('#15abbf', 'cyan')
      .set('#12b886', 'teal')
      .set('#3fbf57', 'green')
      .set('#82c91e', 'lime')
      .set('#fab005', 'yellow')
      .set('#fc7d14', 'orange');

    if (!colorNames.has(color)) {
      pickedColor = 'blue';
    } else {
      pickedColor = colorNames.get(color);
    }

    dispatch(
      addTag({
        label,
        color: pickedColor,
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
      <form
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          css={{ marginBottom: '1rem' }}
          label="Tag label"
          aria-label="tag-label-input"
          placeholder="Give the tag a label..."
          {...register('label', { required: true })}
          error={errors.label?.type === 'required' ? 'Tags must have a label' : null}
        />

        <ColorInput
          css={{ marginBottom: '1rem' }}
          format="hex"
          value={color}
          onChange={setColor}
          withPicker={false}
          swatchesPerRow={7}
          swatches={colorSwatches}
        />

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}

export default TagForm;
