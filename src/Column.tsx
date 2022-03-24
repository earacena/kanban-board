import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { useDrop } from 'react-dnd';
import {
  String as RtString, Number as RtNumber, Array as RtArray, Record as RtRecord, Static as RtStatic,
} from 'runtypes';
import ItemTypes from './ItemTypes';
import Card, { CardType, Cards } from './Card';

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

export const ColumnType = RtRecord({
  id: RtNumber,
  label: RtString,
  cards: Cards,
});

export const Columns = RtArray(ColumnType);

interface ColumnProps {
  id: number;
  label: string;
}

const findLargestIdValue = (cards: RtStatic<typeof Cards>) => (
  cards.reduce((prev, curr) => Math.max(prev, curr.id), 0)
);

function Column({ id, label }: ColumnProps) {
  const [cards, setCards] = useState<RtStatic<typeof Cards>>([]);
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item) => {
        if (CardType.guard(item)) {
          setCards(cards.concat(item));
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [cards],
  );

  const handleAddCard = () => {
    const newCardId = findLargestIdValue(cards) + 1;
    setCards(cards.concat({
      id: newCardId,
      columnId: id,
      label: `Card ${newCardId}`,
    }));
  };

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
      style={{ ...style, backgroundColor, color }}
    >
      {label}
      <ul>
        {cards.map((card) => (
          <Card key={card.id} label={card.label} />
        ))}
      </ul>
      <button type="button" onClick={handleAddCard}>Add Card</button>
    </div>
  );
}

export default Column;
