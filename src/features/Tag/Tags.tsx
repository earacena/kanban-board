import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Badge } from '@mantine/core';
import { tagStyle, tagContainerStyle } from './styles/tags.styles';
import { useAppSelector } from '../../hooks';
import type { TagsType } from './types/tag.types';

type TagsProps = {
  tags?: TagsType
};

function Tags({ tags }: TagsProps) {
  const allTags = useAppSelector((state) => state.tags.allTags);

  return (
    <div css={tagContainerStyle}>
      {tags && tags.map((tag) => (
        <Badge
          color={tag.color}
          size="md"
          radius="sm"
          variant="filled"
          css={tagStyle}
          key={tag.id}
        >
          {tag.label}
        </Badge>
      ))}
      {!tags && allTags && allTags.map((tag) => (
        <Badge
          color={tag.color}
          size="md"
          radius="sm"
          variant="filled"
          css={tagStyle}
          key={tag.id}
        >
          {tag.label}
        </Badge>
      ))}
    </div>
  );
}

Tags.defaultProps = {
  tags: undefined,
};

export default Tags;
