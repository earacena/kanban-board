import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addCard } from './cards.slice';
import { useAppDispatch } from './hooks';

type Inputs = {
  label: string,
  body: string,
};

interface CardFormProps {
  formVisible: boolean;
  setFormVisible: (value: React.SetStateAction<boolean>) => void;
  columnId: string;
}

function CardForm({ formVisible, setFormVisible, columnId }: CardFormProps) {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#aabbcc');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      label: '',
      body: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    const { label, body } = formData;
    dispatch(
      addCard({
        label,
        body,
        columnId,
        color,
      }),
    );
    reset({
      label: '',
      body: '',
    });
    setFormVisible(!formVisible);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
        Create a new card
        <label htmlFor="card-label-input">
          Label
          {errors.label?.type === 'required' && <span style={{ color: 'red' }}>Cards must have a label</span>}
          <input
            id="card-label-input"
            type="text"
            placeholder="Enter a new label name..."
            {...register('label', { required: true })}
          />
        </label>
        <label htmlFor="card-body-textarea">
          Body
          {errors.label?.type === 'required' && <span style={{ color: 'red' }}>Cards must have a label</span>}
          <textarea
            id="card-body-textarea"
            placeholder=""
            {...register('body', { required: true })}
          />
        </label>

        <HexColorPicker color={color} onChange={setColor} />

        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={() => setFormVisible(!formVisible)}>Cancel</button>
    </div>
  );
}

export default CardForm;
