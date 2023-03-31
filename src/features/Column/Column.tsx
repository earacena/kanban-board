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
  Button, Title,
} from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Card } from '../Card';
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
import CardForm from '../Card/CardForm';
import { DeleteConfirmationModal } from '../../components';

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
    dispatch(deleteColumn({ columnId: id }));
    dispatch(removeCardsWithColumnId({ columnId: id }));
  };

  return (
    <Droppable id={id} key={id} style={columnStyle}>
      {beingEdited ? (
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
      )}
      <DeleteConfirmationModal
        opened={beingDeleted}
        setOpened={setBeingDeleted}
        handleDelete={handleDelete}
        label={`Delete ${label}`}
      />
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {cardsInThisColumn.map((card) => (
          <SortableItem
            key={card.id}
            id={card.id}
            style={sortableItemStyle as React.CSSProperties}
          >
            <Card
              key={card.id}
              id={card.id}
              brief={card.brief}
              body={card.body}
              columnLabel={label}
              tags={card.tags}
            />
          </SortableItem>
        ))}
      </SortableContext>
      {cardFormOpened && (
        <CardForm columnId={id} setCardFormOpened={setCardFormOpened} />
      )}
      {!cardFormOpened && (
        <Button
          css={cardFormButtonStyle}
          type="button"
          variant="subtle"
          onClick={() => setCardFormOpened(true)}
        >
          <BsPlus size={19} />
          <span css={cardFormButtonLabelStyle}>ADD NEW CARD</span>
        </Button>
      )}
    </Droppable>
  );
}

export default Column;
