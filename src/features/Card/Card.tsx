/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import {
  Group, Text,
} from '@mantine/core';
import { Tags } from '../Tag';
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

type CardProps = {
  id: string;
  brief: string;
  body: string,
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

  const [cardModalOpened, setCardModalOpened] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState<boolean>(false);

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
      <Tags cardId={id} size="sm" />
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
