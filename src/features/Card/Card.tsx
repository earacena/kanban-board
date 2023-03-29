/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import {
  Button,
  Group, Modal, Stack, Text,
} from '@mantine/core';
import { Tags } from '../Tag';
import type { TagsType } from '../Tag';
import {
  cardStyle,
} from './styles/card.styles';
import ExpandedCard from './ExpandedCard';
import { useAppDispatch } from '../../hooks';
import { removeCard } from './stores/cards.slice';

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
  const dispatch = useAppDispatch();

  const [cardModalOpened, setCardModalOpened] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState<boolean>(false);

  const handleDelete = () => {
    dispatch(removeCard({ cardId: id }));
  };

  return (
    <div css={{ ...cardStyle, cursor: 'pointer' }} key={id}>
      {tags && <Tags appliedTags={tags} />}
      <Group position="center" onClick={() => setCardModalOpened(true)}>
        <Text fw={300} truncate css={{ width: '200px' }}>
          {brief}
        </Text>
      </Group>
      <ExpandedCard
        id={id}
        cardModalOpened={cardModalOpened}
        setCardModalOpened={setCardModalOpened}
        setBeingDeleted={setBeingDeleted}
        brief={brief}
        body={body}
        tags={tags}
        columnLabel={columnLabel}
      />
      <Modal
        opened={beingDeleted}
        onClose={() => setBeingDeleted(false)}
        radius="md"
      >
        <Stack align="center">
          <Text size="xl" weight={500} css={{ margin: '20px' }}>
            {`Delete '${brief}'?`}
          </Text>
          <Group>
            <Button
              css={{ marginRight: '0.5rem' }}
              color="red"
              variant="light"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="filled"
              onClick={() => setBeingDeleted(false)}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

export default Card;
