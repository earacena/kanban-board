/** @jsxRuntime classic */
import React, { useState } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { BsPenFill, BsFillPlusCircleFill, BsTrashFill } from 'react-icons/bs';
import { useAppSelector, useAppDispatch } from './hooks';
import Card from './Card';
import SortableItem from './SortableItem';
import Droppable from './Droppable';
import CardForm from './CardForm';
import ColumnEditForm from './ColumnEditForm';
import {
  cardFormButtonStyle,
  columnDeleteButtonStyle,
  columnEditButtonStyle,
  columnHeaderStyle,
  columnLabelStyle,
  columnStyle,
  sortableItemStyle,
} from './column.styles';
import {
  deleteColumn,
} from './columns.slice';
import {
  removeCardsWithColumnId,
} from './cards.slice';

interface ColumnProps {
  id: string;
  label: string;
}

function Column({ id, label }: ColumnProps) {
  const dispatch = useAppDispatch();
  const [beingEdited, setBeingEdited] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState(false);
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
      {!beingEdited && (
        <span css={columnHeaderStyle}>
          <p css={columnLabelStyle}>{label}</p>
          <button
            css={columnEditButtonStyle}
            type="button"
            onClick={() => setBeingEdited(!beingEdited)}
          >
            <BsPenFill size={15} />
          </button>
          {!beingDeleted && (
            <button
              css={columnDeleteButtonStyle}
              type="button"
              onClick={() => setBeingDeleted(true)}
            >
              <BsTrashFill size={15} />
            </button>
          )}
        </span>
      )}
      {beingDeleted && (
        <div
          css={{
            margin: '1rem',
            width: '100%',
            alignSelf: 'center',
            border: '1px lightgray solid',
            backgroundColor: 'white',
            borderRadius: '10px',
          }}
        >
          <p>
            {`Are you sure you want to delete column '${label}'?`}
          </p>
          <button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setBeingDeleted(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {beingEdited && (
        <ColumnEditForm
          id={id}
          prevLabel={label}
          beingEdited={beingEdited}
          setBeingEdited={setBeingEdited}
        />
      )}
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        {cardsInThisColumn.map((card) => (
          <SortableItem
            key={card.id}
            id={card.id}
            style={{ ...sortableItemStyle, borderLeft: `3px ${card.color} solid` } as React.CSSProperties}
          >
            <Card
              key={card.id}
              id={card.id}
              brief={card.brief}
              columnId={card.columnId}
              body={card.body}
              tags={card.tags}
            />
          </SortableItem>
        ))}
      </SortableContext>
      <button
        css={cardFormButtonStyle}
        type="button"
        onClick={() => setCardFormOpened(true)}
      >
        <BsFillPlusCircleFill size={25} />
      </button>
      <CardForm
        cardFormOpened={cardFormOpened}
        setCardFormOpened={setCardFormOpened}
        columnId={id}
      />
    </Droppable>
  );
}

export default Column;
