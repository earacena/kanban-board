import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Static as RtStatic } from 'runtypes';
import { Badge } from '@mantine/core';
import { Tags as TagArray } from './tag.types';
import { tagStyle, tagContainerStyle } from './tags.styles';

interface TagsProps {
  tags: RtStatic<typeof TagArray>;
}

function Tags({ tags }: TagsProps) {
  return (
    <div css={tagContainerStyle}>
      {tags.map((tag) => (
        <Badge
          color={tag.color}
          size="sm"
          variant="outline"
          css={tagStyle}
          key={tag.id}
        >
          {tag.label}
        </Badge>
      ))}
    </div>
  );
}

export default Tags;
