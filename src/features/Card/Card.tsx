/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeCard } from './stores/cards.slice';
import { DeleteConfirmationModal } from '../../components';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import cardServices from '../../services/card.service';
import tagServices from '../../services/tag.service';
import { setTags } from '../Tag/stores/tag.slice';

type CardProps = {
  id: string;
  brief: string;
  body: string | undefined,
  columnLabel: string,
};

function Card({
  id,
  brief,
  body,
  columnLabel,
}: CardProps) {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);

  const tags = useAppSelector((state) => state.tags.allTags);
  const [cardModalOpened, setCardModalOpened] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (session) {
          const fetchedTags = await tagServices.fetchUserTags({ userId: session.id });
          dispatch(setTags({ allTags: fetchedTags }));
        }
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    };

    fetchTags();
  });

  const handleDelete = async () => {
    if (session) {
      try {
        await cardServices.deleteCard({ cardId: id });
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    }
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
      <DeleteConfirmationModal
        opened={beingDeleted}
        setOpened={setBeingDeleted}
        handleDelete={handleDelete}
        label={`Delete '${brief}'`}
      />
    </div>
  );
}

export default Card;
