import React from 'react';
import type { CSSProperties } from 'react';
import { addCard } from './cards.slice';
import { useAppDispatch, useAppSelector } from './hooks';
import Card from './Card';

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

interface ColumnProps {
  id: number;
  label: string;
}

function Column({ id, label }: ColumnProps) {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(
    (state) => state.cards.allCards.filter((c) => c.columnId === id),
  );

  const handleAddCard = () => dispatch(addCard({ columnId: id, label: 'Card' }));

  return (
    <div role="list" style={{ ...style }}>
      {`${label} ${id}`}
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          label={card.label}
          columnId={card.columnId}
        />
      ))}
      <button type="button" onClick={handleAddCard}>Add Card</button>
    </div>
  );
}

export default Column;
