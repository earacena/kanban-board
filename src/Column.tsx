import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { CSSProperties } from 'react';
import { addCard } from './cards.slice';
import { useAppDispatch, useAppSelector } from './hooks';
import Card from './Card';
import SortableItem from './SortableItem';

const style: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px red solid',
  height: '100%',
  minHeight: '15rem',
  minWidth: '20rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

const cardStyle: CSSProperties = {
  border: '1px lightgrey solid',
  backgroundColor: 'white',
  padding: '1rem',
  margin: '0.2em',
  borderRadius: '8px',
  boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
};

interface ColumnProps {
  id: number;
  label: string;
}

function Column({ id, label }: ColumnProps) {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.allCards);
  const cardsInThisColumn = cards.filter((card) => card.columnId === id);
  const cardIds = cardsInThisColumn.map((card) => card.id.toString());

  const handleAddCard = () => dispatch(addCard({ columnId: id, label: 'Card' }));

  return (
    <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
      <div key={id} style={style}>
        {`${label} ${id}`}
        {cardsInThisColumn.map((card) => (
          <SortableItem key={card.id} id={card.id} style={cardStyle}>
            <Card
              key={card.id}
              id={card.id}
              label={card.label}
              columnId={card.columnId}
            />
          </SortableItem>
        ))}
        <button type="button" onClick={handleAddCard}>
          Add Card
        </button>
      </div>
    </SortableContext>
  );
}

export default Column;
