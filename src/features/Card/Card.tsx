/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import {
  Group, Text,
} from '@mantine/core';
import { Tags } from '../Tag';
import type { TagsType } from '../Tag';
import {
  cardStyle,
} from './styles/card.styles';
import ExpandedCard from './ExpandedCard';

type CardProps = {
  id: string;
  brief: string;
  body: string | undefined,
  tags: TagsType | undefined,
  columnLabel: string,
};

function Card({
  id,
  brief,
  body,
  tags,
  columnLabel,
}: CardProps) {
  const [cardModalOpened, setCardModalOpened] = useState(false);
  // const [cardEditFormOpened, setCardEditFormOpened] = useState(false);

  return (
    <div css={{ ...cardStyle, cursor: 'pointer' }} key={id}>
      {tags && <Tags appliedTags={tags} />}
      <Group position="center" onClick={() => setCardModalOpened(true)} css={{ marginTop: '10px' }}>
        <Text fw={300} truncate css={{ width: '90%' }}>
          {brief}
        </Text>
      </Group>
      <ExpandedCard
        id={id}
        cardModalOpened={cardModalOpened}
        setCardModalOpened={setCardModalOpened}
        brief={brief}
        body={body}
        tags={tags}
        columnLabel={columnLabel}
      />
    </div>
  );
}

export default Card;
