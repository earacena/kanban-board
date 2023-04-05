import {
  Button, Stack, Text, TextInput,
} from '@mantine/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { updateBoardLabel } from './stores/boards.slice';

interface Inputs {
  label: string,
}

interface BoardEditFormProps {
  boardId: string,
  boardLabel: string,
}

function BoardEditForm({ boardId, boardLabel }: BoardEditFormProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      label: boardLabel,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { label } = formData;

    dispatch(updateBoardLabel({ boardId, newLabel: label }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Board label"
          {...register('label', { required: true })}
          error={errors.label?.type === 'required' && <Text size="sm" color="red">A board requires a non-empty label</Text>}
        />
        <Button type="submit">Update</Button>
      </Stack>
    </form>
  );
}

export default BoardEditForm;
