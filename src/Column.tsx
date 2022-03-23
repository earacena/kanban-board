import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { useDrop } from 'react-dnd';
import {
  String as RtString, Number as RtNumber, Array as RtArray, Record as RtRecord, Static as RtStatic,
} from 'runtypes';
import ItemTypes from './ItemTypes';
import { CardType, Cards } from './Card';

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
  label: string;
}

const findLargestIdValue = (cards: RtStatic<typeof Cards>) => (
  cards.reduce((prev, curr) => Math.max(prev, curr.id), 0)
);

function Column({ label }: ColumnProps) {
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
    const newId = findLargestIdValue(cards) + 1;
    setCards(cards.concat({
      id: newId,
      label: `Card ${newId}`,
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

  return (
    <div
      ref={drop}
      role="list"
      style={{ ...style, backgroundColor, color }}
    >
      {label}
      {isActive ? 'release to drop' : 'drag a card here'}
      <ul>
        {cards.map((card) => (
          <div key={card.id} style={{ border: '1px white solid' }}>{card.label}</div>
        ))}
      </ul>
      <button type="button" onClick={handleAddCard}>Add Card</button>
    </div>
  );
}

export default Column;
