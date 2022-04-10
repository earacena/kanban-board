/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GiOpenBook } from 'react-icons/gi';
import { Modal, Badge } from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { Tags } from './tag.types';
import {
  briefStyle,
  cardHeaderStyle,
  cardStyle,
  expandCardButtonStyle,
  tagContainerStyle,
  tagStyle,
} from './card.style';

interface CardProps {
  id: string;
  columnId: string,
  brief: string;
  body: string,
  tags: RtStatic<typeof Tags>,
}

function Card({
  id,
  columnId,
  brief,
  body,
  tags,
}: CardProps) {
  const [cardModalOpened, setCardModalOpened] = useState(false);

  console.log(`Card ${id} - ${columnId}`);

  return (
    <div css={cardStyle}>
      <div>
        {brief}
        {body !== '' && (
          <button
            type="button"
            css={expandCardButtonStyle}
            onClick={() => setCardModalOpened(true)}
          >
            <GiOpenBook />
          </button>
        )}
      </div>
      <div>
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
      <Modal opened={cardModalOpened} onClose={() => setCardModalOpened(false)}>
        <div css={cardHeaderStyle}>
          <p css={briefStyle}>
            {brief}
          </p>
          <div css={tagContainerStyle}>
            {tags.map((tag) => (
              <Badge
                color={tag.color}
                variant="outline"
                css={tagStyle}
                key={tag.id}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
        {body}
      </Modal>
    </div>
  );
}

export default Card;
