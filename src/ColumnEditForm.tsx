import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="card-label-input">
          Label
          {errors.label?.type === 'required' && <span style={{ color: 'red' }}>Cards must have a label</span>}
          <input
            id="column-label-input"
            type="text"
            placeholder="Enter a new column name..."
            {...register('label', { required: true })}
          />
        </label>

        <button type="submit">Update</button>
      </form>
      <button type="button" onClick={() => setBeingEdited(!beingEdited)}>Cancel</button>
    </div>
  );
}

export default ColumnEditForm;
