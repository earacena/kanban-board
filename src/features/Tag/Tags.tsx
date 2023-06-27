import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Badge, MantineSize } from '@mantine/core';
import { tagContainerStyle } from './styles/tags.styles';
import { useAppSelector } from '../../hooks';

type TagsProps = {
  cardId: string,
  size?: MantineSize;
};

function Tags({
  cardId,
  size,
}: TagsProps) {
  const allTags = useAppSelector((state) => state.tags.allTags);
  const cardTags = allTags.filter((t) => t.cardIds.includes(cardId));

  return (
    <div css={tagContainerStyle}>
      {cardTags
        && cardTags.map((tag) => (
          <Badge
            size={size ?? 'sm'}
            radius="sm"
            variant="gradient"
            gradient={{ from: tag.color, to: tag.color }}
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
  size: undefined,
};

export default Tags;
