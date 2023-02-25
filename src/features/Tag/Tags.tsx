import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Badge, MantineSize } from '@mantine/core';
import { tagContainerStyle } from './styles/tags.styles';
import type { Tags as TagsType } from './types/tag.types';

type TagsProps = {
  appliedTags?: TagsType;
  size?: MantineSize | undefined;
};

function Tags({
  appliedTags,
  size,
}: TagsProps) {
  return (
    <div css={tagContainerStyle}>
      {appliedTags
        && appliedTags.map((tag) => (
          <Badge
            color={tag.color}
            size={size ?? 'sm'}
            radius="sm"
            variant="filled"
            css={{ marginLeft: '5px' }}
            key={tag.id}
          >
            {tag.label}
          </Badge>
        ))}
    </div>
  );
}

Tags.defaultProps = {
  appliedTags: undefined,
  size: undefined,
};

export default Tags;
