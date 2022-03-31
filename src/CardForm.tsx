import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addCard } from './cards.slice';
import { useAppDispatch } from './hooks';

type Inputs = {
  brief: string,
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
    setFormVisible(!formVisible);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
        Create a new card
        <label htmlFor="card-brief-input">
          Brief
          {errors.brief?.type === 'required' && <span style={{ color: 'red' }}>Cards must have a label</span>}
          <input
            id="card-brief-input"
            type="text"
            placeholder="Enter a brief description of the card..."
            {...register('brief', { required: true })}
          />
        </label>
        <label htmlFor="card-body-textarea">
          Body
          {errors.body?.type === 'required' && <span style={{ color: 'red' }}>Cards must have a label</span>}
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
