/** @jsxRuntime classic */
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput } from '@mantine/core';
import { useAppDispatch } from './hooks';
import { updateColumn } from './columns.slice';

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
    console.log(formData);
    const { label } = formData;
    dispatch(updateColumn({ id, label }));
    setBeingEdited(!beingEdited);
  };

  return (
    <form
      css={{
        border: '1px lightgrey solid',
        borderRadius: '10px',
        backgroundColor: 'white',
        padding: '1rem',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        css={{ marginBottom: '1rem' }}
        label="Column label"
        aria-label="column-label-input"
        placeholder="Set the label of the column..."
        {...register('label', { required: true })}
        error={errors.label?.type === 'required' ? 'Columns must have a label' : null}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default ColumnEditForm;
