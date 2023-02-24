/** @jsxRuntime classic */
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BsCheck2, BsX } from 'react-icons/bs';
import { ActionIcon, Group, TextInput } from '@mantine/core';
import { useAppDispatch } from '../../hooks';
import { updateColumnLabel } from './stores/columns.slice';
import { columnEditFormStyle, textInputStyle } from './styles/columnEditForm.styles';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      label: prevLabel,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { label } = formData;
    dispatch(updateColumnLabel({ columnId: id, updatedColumnLabel: label }));
    setBeingEdited(!beingEdited);
  };

  return (
    <form
      css={columnEditFormStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Group position="center" align="center">
        <TextInput
          css={textInputStyle}
          label="Column label"
          aria-label="column-label-input"
          placeholder="Set the label of the column..."
          {...register('label', { required: true })}
          error={errors.label?.type === 'required' ? 'Columns must have a label' : null}
        />
        <ActionIcon type="submit" radius="xl" variant="filled" color="green">
          <BsCheck2 />
        </ActionIcon>
        <ActionIcon type="submit" radius="xl" variant="light" color="red">
          <BsX />
        </ActionIcon>
      </Group>
    </form>
  );
}

export default ColumnEditForm;
