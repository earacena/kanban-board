/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GiOpenBook } from 'react-icons/gi';
import { Modal } from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { Tags as TagArray } from './tag.types';
import {
  briefStyle,
  cardHeaderStyle,
  cardStyle,
  expandCardButtonStyle,
} from './card.styles';
import Tags from './Tags';

interface CardProps {
  id: string;
  columnId: string,
  brief: string;
  body: string,
  tags: RtStatic<typeof TagArray>,
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
      <Tags tags={tags} />
      <Modal opened={cardModalOpened} onClose={() => setCardModalOpened(false)}>
        <div css={cardHeaderStyle}>
          <p css={briefStyle}>
            {brief}
          </p>
          <Tags tags={tags} />
        </div>
        {body}
      </Modal>
    </div>
  );
}

export default Card;
