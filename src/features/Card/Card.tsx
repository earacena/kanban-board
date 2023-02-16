/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import {
  Group, Text,
} from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { Tags, TagArray } from '../Tag';
import {
  cardStyle,
} from './styles/card.styles';
import ExpandedCard from './ExpandedCard';

type CardProps = {
  id: string;
  brief: string;
  body: string | undefined,
  tags: RtStatic<typeof TagArray> | undefined,
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
      <Group position="center" onClick={() => setCardModalOpened(true)}>
        <Text truncate css={{ width: '90%' }}>
          {brief}
        </Text>
      </Group>
      {tags && <Tags tags={tags} />}
      <ExpandedCard
        cardModalOpened={cardModalOpened}
        setCardModalOpened={setCardModalOpened}
        brief={brief}
        body={body}
        columnLabel={columnLabel}
      />
    </div>
  );
}

export default Card;
