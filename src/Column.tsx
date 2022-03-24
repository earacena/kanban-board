import React from 'react';
import type { CSSProperties } from 'react';
import { useDrop } from 'react-dnd';
import { addCard } from './cards.slice';
import { useAppDispatch, useAppSelector } from './hooks';
import Card from './Card';
import ItemTypes from './ItemTypes';

const style: CSSProperties = {
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

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: () => ({ columnId: id }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [cards],
  );

  const handleAddCard = () => dispatch(addCard({ columnId: id, label: 'Card' }));

  const isActive = canDrop && isOver;
  let backgroundColor = 'white';
  let color = 'black';
  if (isActive) {
    backgroundColor = 'darkgrey';
    color = 'white';
  } else {
    backgroundColor = 'white';
    color = 'black';
  }

  if (isActive) {
    return (
      <div
        ref={drop}
        role="list"
        style={{ ...style, backgroundColor, color }}
      >
        release to drop
      </div>
    );
  }

  return (
    <div
      ref={drop}
      role="list"
      style={{ ...style }}
    >
      {`${label} ${id}`}
      {cards.map((card) => <Card key={card.id} id={card.id} label={card.label} />)}
      <button type="button" onClick={handleAddCard}>Add Card</button>
    </div>
  );
}

export default Column;
