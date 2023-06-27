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
import { v4 as uuidv4 } from 'uuid';

import { tagPickerStyle } from './styles/tagPicker.styles';
import type { TagArrayType, TagType } from './types/tag.types';
import { addTag, removeTag, updateTag } from './stores/tag.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import tagServices from '../../services/tag.service';

type TagPickerProps = {
  cardId: string,
};

type TagInputs = {
  label: string;
};

function TagPickerForm({ cardId }: TagPickerProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);
  const allTags = useAppSelector((state) => state.tags.allTags);
  // const uniqueTags = filterDuplicateTags(allTags);
  const [tagColor, setTagColor] = useState<string>('rgba(46, 130, 232, 1)');

  const { register, handleSubmit } = useForm<TagInputs>({
    defaultValues: {
      label: '',
    },
  });

  const onSubmit: SubmitHandler<TagInputs> = async ({ label }) => {
    if (session) {
      try {
        const newTag = await tagServices.create({
          userId: session.id,
          cardId,
          label,
          color: tagColor,
        });

        dispatch(addTag({ tag: newTag }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    } else {
      dispatch(
        addTag({
          tag: {
            id: uuidv4(),
            userId: uuidv4(),
            cardIds: [cardId],
            label,
            color: tagColor,
          },
        }),
      );
    }
  };

  const handleCheck = async (tag: TagType) => {
    if (session && !tag.cardIds.includes(cardId)) {
      try {
        const updatedTag = await tagServices.addCardIdToTag({ tagId: tag.id, cardId });
        dispatch(updateTag({ tagId: tag.id, tag: updatedTag }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logErrorMsg(decoded.message);
      }
    } else if (session && tag.cardIds.includes(cardId)) {
      try {
        const updatedTag = await tagServices.removeCardIdFromTag({ tagId: tag.id, cardId });
        dispatch(updateTag({ tagId: tag.id, tag: updatedTag }));
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logErrorMsg(decoded.message);
      }
    } else if (tag.cardIds.includes(cardId)) {
      // User not logged in
      dispatch(
        updateTag({
          tagId: tag.id,
          tag: {
            ...tag,
            cardIds: tag.cardIds.filter((c) => c !== cardId),
          },
        }),
      );
    } else {
      dispatch(
        updateTag({
          tagId: tag.id,
          tag: {
            ...tag,
            cardIds: tag.cardIds.concat(cardId),
          },
        }),
      );
    }
  };

  const handleRemoveTag = async (tagId: string) => {
    if (session) {
      await tagServices.deleteTag({ tagId });
    }

    dispatch(removeTag({ tagId }));
  };

  const tagIsCheckedForCard = (tagId: string, currentCardId: string): boolean => {
    const cardTags: TagArrayType = allTags.filter((t) => t.cardIds.includes(currentCardId));
    return cardTags.find((t) => t.id === tagId) !== undefined;
  };

  return (
    <div css={tagPickerStyle}>
      {allTags.map((tag) => {
        const checked: boolean = tagIsCheckedForCard(tag.id, cardId);
        return (
          <div
            key={tag.id}
            css={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ActionIcon key={`${tag.id}-deleteButton`} onClick={() => handleRemoveTag(tag.id)} color="red">
              <TiDeleteOutline />
            </ActionIcon>
            <Button
              key={`${tag.id}-toggleButton`}
              type="button"
              onClick={() => handleCheck(tag)}
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
      {allTags.length === 0 && (
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
              {...register('label')}
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

export default TagPickerForm;
