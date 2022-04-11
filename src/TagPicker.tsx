import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Badge } from '@mantine/core';
import { IoMdCheckmark } from 'react-icons/io';
import { Static as RtStatic } from 'runtypes';
import { tagStyle, tagPickerStyle } from './tagPicker.styles';
import { Tags } from './tag.types';

interface TagPickerProps {
  tags: RtStatic<typeof Tags>;
  appliedTags: RtStatic<typeof Tags>;
  setAppliedTags: (value: React.SetStateAction<RtStatic<typeof Tags>>) => void;
}

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
