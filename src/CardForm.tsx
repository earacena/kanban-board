/** @jsxRuntime classic */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Modal,
  Popover,
  Badge,
  ColorPicker,
  Textarea,
  DEFAULT_THEME,
} from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { IoIosColorPalette, IoMdCheckmark } from 'react-icons/io';
import { Tags } from './tag.types';
import { addCard } from './cards.slice';
import { useAppDispatch, useAppSelector } from './hooks';

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
  const [colorPickerOpened, setColorPickerOpened] = useState(false);
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
      <form
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Textarea
          css={{
            width: '100%',
          }}
          placeholder="Write a brief sentence about the task..."
          label="Brief description"
          aria-label="card-brief-textarea"
          error={errors.brief?.type === 'required' ? 'Cards must have a brief description' : null}
          {...register('brief', { required: true })}
          maxRows={2}
        />

        <Textarea
          css={{
            width: '100%',
            marginTop: '0.2rem',
          }}
          placeholder="Write about the task in more detail..."
          label="Detailed description"
          aria-label="card-body-textarea"
          {...register('body')}
          autosize
          minRows={4}
        />
        <div css={{ display: 'flex', padding: '0.5rem' }}>
          {tags.map((tag) => (
            appliedTags.find((t) => t.id === tag.id)
              ? (
                <Badge
                  component="button"
                  color={tag.color}
                  css={{
                    '&:hover': {
                      backgroundColor: 'lightgray',
                    },
                  }}
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
                  css={{
                    '&:hover': {
                      backgroundColor: 'lightgray',
                    },
                  }}
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
        <Popover
          opened={colorPickerOpened}
          onClose={() => setColorPickerOpened(false)}
          target={(
            <button css={{ alignSelf: 'center' }} type="button" onClick={() => setColorPickerOpened(!colorPickerOpened)}>
              <IoIosColorPalette />
              Pick a color
            </button>
          )}
          position="bottom"
          placement="center"
          shadow="md"
          closeOnClickOutside
          withCloseButton
          withArrow
        >
          <ColorPicker
            format="hex"
            value={color}
            onChange={setColor}
            withPicker={false}
            fullWidth
            swatches={[
              ...DEFAULT_THEME.colors.red,
              ...DEFAULT_THEME.colors.blue,
              ...DEFAULT_THEME.colors.green,
              ...DEFAULT_THEME.colors.orange,
              ...DEFAULT_THEME.colors.yellow,
            ]}
          />
        </Popover>

        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={() => setCardFormOpened(false)}>Cancel</button>
    </Modal>
  );
}

export default CardForm;
