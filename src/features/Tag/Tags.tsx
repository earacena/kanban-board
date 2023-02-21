import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Badge, MantineSize } from '@mantine/core';
import { tagStyle, tagContainerStyle } from './styles/tags.styles';
import { useAppSelector } from '../../hooks';
import type { TagsType } from './types/tag.types';

type TagsProps = {
  tags?: TagsType,
  size?: MantineSize | undefined,
};

function Tags({ tags, size }: TagsProps) {
  const allTags = useAppSelector((state) => state.tags.allTags);

  return (
    <div css={tagContainerStyle}>
      {tags && tags.map((tag) => (
        <Badge
          color={tag.color}
          size={size ?? 'sm'}
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
          size={size ?? 'sm'}
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
  size: undefined,
};

export default Tags;
