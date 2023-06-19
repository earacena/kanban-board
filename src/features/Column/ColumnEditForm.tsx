/** @jsxRuntime classic */
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BsCheck2, BsX } from 'react-icons/bs';
import { ActionIcon, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateColumn, updateColumnLabel } from './stores/columns.slice';
import { columnEditFormStyle, textInputStyle } from './styles/columnEditForm.styles';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import columnServices from '../../services/column.service';

type Inputs = {
  label: string,
};

interface ColumnEditFormProps {
  id: string;
  prevLabel: string;
  beingEdited: boolean;
  setBeingEdited: (value: React.SetStateAction<boolean>) => void;
}

function ColumnEditForm({
  id,
  prevLabel,
  beingEdited,
  setBeingEdited,
}: ColumnEditFormProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      label: prevLabel,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { label } = formData;

    if (session) {
      try {
        const updatedColumn = await columnServices.update({ columnId: id, changes: { label } });
        dispatch(updateColumn({ updatedColumn }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    } else {
      dispatch(updateColumnLabel({ columnId: id, updatedColumnLabel: label }));
    }

    setBeingEdited(!beingEdited);
  };

  return (
    <form
      css={columnEditFormStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        css={textInputStyle}
        aria-label="column label"
        placeholder="Set the label of the column..."
        {...register('label', { required: true })}
        error={errors.label?.type === 'required' ? 'Columns must have a label' : null}
      />
      <ActionIcon type="submit" radius="xl" variant="filled" color="blue" css={{ marginLeft: '20px' }}>
        <BsCheck2 />
      </ActionIcon>
      <ActionIcon type="submit" radius="xl" variant="light" color="red" css={{ marginLeft: '20px' }}>
        <BsX />
      </ActionIcon>
    </form>
  );
}

export default ColumnEditForm;
