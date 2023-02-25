import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button, Chip, ColorPicker, Popover, createStyles,
} from '@mantine/core';
import { tagPickerStyle } from './styles/tagPicker.styles';
import type { Tags as TagsType } from './types/tag.types';
import { addTag } from './stores/tag.slice';
import { useAppDispatch } from '../../hooks';

type TagPickerProps = {
  tags: TagsType;
  appliedTags: TagsType | undefined,
  updateCardTags: (updatedTags: TagsType) => void,
};

type TagInputs = {
  tagLabel: string,
};

const useStyles = createStyles((theme, _params, getRef) => ({
  label: {
    '&[data-checked]': {
      '&, &:hover': {
        backgroundColor: theme.colors.blue[theme.fn.primaryShade()],
        color: theme.white,
      },

      [`& .${getRef('iconWrapper')}`]: {
        color: theme.white,
      },
    },
  },

  iconWrapper: {
    ref: getRef('iconWrapper'),
  },
}));

function TagPicker({
  tags,
  appliedTags,
  updateCardTags,
}: TagPickerProps) {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [tagColor, setTagColor] = useState<string>('rgba(0,0,0,0)');

  const { register, handleSubmit } = useForm<TagInputs>({
    defaultValues: {
      tagLabel: '',
    },
  });

  const onSubmit: SubmitHandler<TagInputs> = ({ tagLabel }) => {
    dispatch(addTag({ label: tagLabel, color: tagColor }));
  };

  return (
    <div css={tagPickerStyle}>
      {tags.map((tag) => (
        <Chip
          classNames={classes}
          color={tag.color}
          key={tag.id}
          radius="sm"
          size="md"
          onClick={() => (
            appliedTags?.find((t) => t.id === tag.id)
              ? updateCardTags(appliedTags.filter((t) => t.id !== tag.id))
              : updateCardTags(appliedTags?.concat(tag) ?? [tag])
          )}
          checked={appliedTags?.find((t) => t.id === tag.id) !== undefined}
        >
          {tag.label}
        </Chip>
      ))}
      {
        tags.length === 0 && 'No existing tags'
      }
      <Popover trapFocus shadow="md">
        <Popover.Target>
          <Button css={{ marginLeft: '10px' }} radius="xl" variant="subtle">
            Add
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              aria-label="tag label"
              {...register('tagLabel')}
            />
            <ColorPicker
              css={{ marginTop: '10px' }}
              aria-label="tag color picker"
              value={tagColor}
              onChange={(color) => setTagColor(color)}
            />

            <Button type="submit" radius="xl">
              Create Tag
            </Button>
          </form>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export default TagPicker;
