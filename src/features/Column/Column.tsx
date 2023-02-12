/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { jsx, css } from '@emotion/react';
import { BsPlus } from 'react-icons/bs';
import {
  Button, Modal, Text, Title,
} from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Card, CardForm } from '../Card';
import SortableItem from '../Container/SortableItem';
import Droppable from '../Container/Droppable';
import ColumnEditForm from './ColumnEditForm';
import {
  cardFormButtonLabelStyle,
  cardFormButtonStyle,
  columnHeaderStyle,
  columnStyle,
  sortableItemStyle,
} from './styles/column.styles';
import { deleteColumn } from './stores/columns.slice';
import { removeCardsWithColumnId } from '../Card/stores/cards.slice';
import ColumnSettingsMenu from './ColumnSettingsMenu';

type ColumnProps = {
  id: string;
  label: string;
};

function Column({ id, label }: ColumnProps) {
  const dispatch = useAppDispatch();
  const [beingEdited, setBeingEdited] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [cardFormOpened, setCardFormOpened] = useState(false);
  const cards = useAppSelector((state) => state.cards.allCards);
  const cardsInThisColumn = cards.filter((card) => card.columnId === id);
  const cardIds = cardsInThisColumn.map((card) => card.id.toString());

  const handleDelete = () => {
    dispatch(deleteColumn({ id }));
    dispatch(removeCardsWithColumnId({ id }));
  };
  return (
    <Droppable id={id} key={id} style={columnStyle}>
      {
        beingEdited
          ? (
            <ColumnEditForm
              id={id}
              prevLabel={label}
              beingEdited={beingEdited}
              setBeingEdited={setBeingEdited}
            />
          ) : (
            <span css={css({ ...columnHeaderStyle })}>
              <Title order={2}>{label}</Title>
              <ColumnSettingsMenu
                opened={menuOpened}
                setOpened={setMenuOpened}
                setBeingEdited={setBeingEdited}
                setBeingDeleted={setBeingDeleted}
              />
            </span>
          )
       }
      <Modal opened={beingDeleted} onClose={() => setBeingDeleted(false)}>
        <div>
          <Text size="sm" weight={500} css={{ margin: '1rem 0.5rem' }}>
            {`Delete '${label}'?`}
          </Text>
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
        </div>
      </Modal>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {cardsInThisColumn.map((card) => (
          <SortableItem
            key={card.id}
            id={card.id}
            style={
              {
                ...sortableItemStyle,
                borderLeft: `3px ${card.color} solid`,
              } as React.CSSProperties
            }
          >
            <Card
              key={card.id}
              id={card.id}
              brief={card.brief}
              body={card.body}
              tags={card.tags}
            />
          </SortableItem>
        ))}
      </SortableContext>
      <Button
        css={cardFormButtonStyle}
        type="button"
        variant="subtle"
        onClick={() => setCardFormOpened(true)}
      >
        <BsPlus size={19} />
        <span css={cardFormButtonLabelStyle}>ADD NEW CARD</span>
      </Button>
      <CardForm
        cardFormOpened={cardFormOpened}
        setCardFormOpened={setCardFormOpened}
        columnId={id}
      />
    </Droppable>
  );
}

export default Column;
