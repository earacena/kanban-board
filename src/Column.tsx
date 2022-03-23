import { useState } from "react";
import type { CSSProperties, FC } from "react";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { CardType, Cards } from "./Card";
import { String as RtString, Number as RtNumber, Array as RtArray, Record as RtRecord, Static as RtStatic } from 'runtypes';

const style: CSSProperties = {
  border: '1px red solid',
  height: '100%',
  minHeight: '15rem',
  minWidth: '20rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
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
};

function Column({ label }: ColumnProps) {
  const [cards, setCards] = useState<RtStatic<typeof Cards>>([]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, _monitor) => {
      if (CardType.guard(item)) {
        setCards(cards.concat(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }),
  [cards])

  const isActive = canDrop && isOver;
  let backgroundColor = 'black';
  let color = 'white';
  if (isActive) {
    backgroundColor = 'lightgrey';
    color = 'black';
  } else {
    backgroundColor = 'black';
    color = 'white';
  }

  return (
    <div
      ref={drop}
      role='list'
      style={{ ...style, backgroundColor, color }}
    >
      {isActive ? 'release to drop' : 'drag a card here'}
      <ul>
        {cards.map((card) => (
          <div style={{ border: '1px white solid' }} key={card.label}>{card.label}</div>
        ))}
      </ul>
    </div>
  )
}

export default Column;
