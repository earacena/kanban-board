/** @jsxRuntime classic */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Modal,
  Badge,
  Textarea,
  DEFAULT_THEME,
  ColorInput,
} from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { IoMdCheckmark } from 'react-icons/io';
import { Tags } from './tag.types';
import { addCard } from './cards.slice';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  bodyTextAreaStyle,
  briefTextAreaStyle,
  cardFormStyle,
  colorInputStyle,
  tagPickerStyle,
  tagStyle,
} from './cardForm.styles';

type Inputs = {
  brief: string,
  body: string,
};

interface CardFormProps {
  cardFormOpened: boolean;
  setCardFormOpened: (value: React.SetStateAction<boolean>) => void;
  columnId: string;
}

function CardForm({ cardFormOpened, setCardFormOpened, columnId }: CardFormProps) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.allTags);
  const [color, setColor] = useState('#aabbcc');
  const [appliedTags, setAppliedTags] = useState<RtStatic<typeof Tags>>([]);
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
        tags: appliedTags,
      }),
    );
    reset({
      brief: '',
      body: '',
    });
    setAppliedTags([]);
    setCardFormOpened(false);
  };

  return (
    <Modal
      opened={cardFormOpened}
      onClose={() => setCardFormOpened(false)}
      title="Create a card"
    >
      <form css={cardFormStyle} onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          css={briefTextAreaStyle}
          placeholder="Write a brief sentence about the task..."
          label="Brief description"
          aria-label="card-brief-textarea"
          error={errors.brief?.type === 'required' ? 'Cards must have a brief description' : null}
          {...register('brief', { required: true })}
          maxRows={2}
        />

        <Textarea
          css={bodyTextAreaStyle}
          placeholder="Write about the task in more detail..."
          label="Detailed description"
          aria-label="card-body-textarea"
          {...register('body')}
          autosize
          minRows={4}
        />
        <div css={tagPickerStyle}>
          {tags.map((tag) => (
            appliedTags.find((t) => t.id === tag.id)
              ? (
                <Badge
                  component="button"
                  color={tag.color}
                  css={tagStyle}
                  key={tag.id}
                  type="button"
                  variant="outline"
                  onClick={() => (
                    appliedTags.find((t) => t.id === tag.id)
                      ? setAppliedTags(appliedTags.filter((t) => t.id !== tag.id))
                      : setAppliedTags(appliedTags.concat(tag))
                  )}
                >
                  {tag.label}
                  <IoMdCheckmark size={10} />
                </Badge>
              ) : (
                <Badge
                  component="button"
                  color={tag.color}
                  css={tagStyle}
                  key={tag.id}
                  type="button"
                  variant="outline"
                  onClick={() => (
                    appliedTags.find((t) => t.id === tag.id)
                      ? setAppliedTags(appliedTags.filter((t) => t.id !== tag.id))
                      : setAppliedTags(appliedTags.concat(tag))
                  )}
                >
                  {tag.label}
                </Badge>
              )
          ))}
        </div>
        <ColorInput
          css={colorInputStyle}
          format="hex"
          value={color}
          onChange={setColor}
          withPicker={false}
          swatches={[
            ...DEFAULT_THEME.colors.red,
            ...DEFAULT_THEME.colors.orange,
            ...DEFAULT_THEME.colors.yellow,
            ...DEFAULT_THEME.colors.green,
            ...DEFAULT_THEME.colors.blue,
            ...DEFAULT_THEME.colors.grape,
          ]}
        />
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}

export default CardForm;
