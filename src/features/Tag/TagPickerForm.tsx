import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdCheckmark } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import {
  ActionIcon,
  Button,
  ColorPicker,
  Group,
  Popover,
  Text,
} from '@mantine/core';
import { tagPickerStyle } from './styles/tagPicker.styles';
import type { Tags as TagsType } from './types/tag.types';
import { addTag, removeTag } from './stores/tag.slice';
import { useAppDispatch } from '../../hooks';

type TagPickerProps = {
  tags: TagsType;
  appliedTags: TagsType | undefined;
  updateCardTags: (updatedTags: TagsType) => void;
  removeTagFromCards: (tagId: string) => void;
};

type TagInputs = {
  tagLabel: string;
};

function TagPicker({
  tags,
  appliedTags,
  updateCardTags,
  removeTagFromCards,
}: TagPickerProps) {
  const dispatch = useAppDispatch();
  const [tagColor, setTagColor] = useState<string>('rgba(46, 130, 232, 1)');

  const { register, handleSubmit } = useForm<TagInputs>({
    defaultValues: {
      tagLabel: '',
    },
  });

  const onSubmit: SubmitHandler<TagInputs> = ({ tagLabel }) => {
    dispatch(addTag({ label: tagLabel, color: tagColor }));
  };

  const handleRemoveTag = (tagId: string) => {
    dispatch(removeTag({ tagId }));
    removeTagFromCards(tagId);
  };

  const tagIsChecked = (id: string): boolean => appliedTags?.find((t) => t.id === id) !== undefined;

  return (
    <div css={tagPickerStyle}>
      {tags.map((tag) => {
        const checked: boolean = tagIsChecked(tag.id);
        return (
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ActionIcon onClick={() => handleRemoveTag(tag.id)} color="red">
              <TiDeleteOutline />
            </ActionIcon>
            <Button
              key={tag.id}
              type="button"
              onClick={() => (appliedTags?.find((t) => t.id === tag.id)
                ? updateCardTags(appliedTags.filter((t) => t.id !== tag.id))
                : updateCardTags(appliedTags?.concat(tag) ?? [tag]))}
              variant={checked ? 'gradient' : 'outline'}
              gradient={{ from: tag.color, to: tag.color }}
              css={{ marginRight: '10px' }}
            >
              <Group>
                {checked && <IoMdCheckmark size={20} css={{ padding: '0' }} />}
                <Text fw={800} size="lg">
                  {tag.label}
                </Text>
              </Group>
            </Button>
          </div>
        );
      })}
      {tags.length === 0 && (
        <Text fw={300} color="dimmed">
          No existing tags
        </Text>
      )}
      <Popover trapFocus shadow="md">
        <Popover.Target>
          <Button css={{ marginLeft: '10px' }} radius="xl" variant="subtle">
            Add
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <form
            onSubmit={handleSubmit(onSubmit)}
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <input
              aria-label="tag label"
              css={{
                borderRadius: '10px',
                padding: '10px',
                border: '1px gray solid',
                fontWeight: '500',
                marginBottom: '5px',
              }}
              {...register('tagLabel')}
            />
            <ColorPicker
              css={{ marginTop: '10px' }}
              aria-label="tag color picker"
              value={tagColor}
              onChange={(color) => setTagColor(color)}
            />

            <Button type="submit" radius="xl" css={{ marginTop: '5px' }}>
              Create Tag
            </Button>
          </form>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export default TagPicker;
