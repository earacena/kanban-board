import {
  Button, Stack, Text, TextInput,
} from '@mantine/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateBoard, updateBoardLabel } from './stores/boards.slice';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import boardServices from '../../services/board.service';

interface Inputs {
  label: string,
}

interface BoardEditFormProps {
  boardId: string,
  boardLabel: string,
}

function BoardEditForm({ boardId, boardLabel }: BoardEditFormProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      label: boardLabel,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const { label } = formData;

      if (session) {
        const updatedBoard = await boardServices.update({ boardId, changes: { label } });
        dispatch(updateBoard({ updatedBoard }));
      } else {
        // Allow guest to update board label while logged out
        dispatch(updateBoardLabel({ boardId, newLabel: label }));
      }
    } catch (err: unknown) {
      const decoded = ErrorType.parse(err);
      logger.logError(decoded);
    }
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
