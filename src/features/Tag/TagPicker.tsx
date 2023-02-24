import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Badge } from '@mantine/core';
import { IoMdCheckmark } from 'react-icons/io';
import { tagStyle, tagPickerStyle } from './styles/tagPicker.styles';
import type { Tags } from './types/tag.types';

type TagPickerProps = {
  tags: Tags;
  appliedTags: Tags;
  setAppliedTags: (value: React.SetStateAction<Tags>) => void;
};

function TagPicker({ tags, appliedTags, setAppliedTags }: TagPickerProps) {
  return (
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
  );
}

export default TagPicker;
