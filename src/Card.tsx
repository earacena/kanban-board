import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import {
  Number as RtNumber, Record as RtRecord, String as RtString, Array as RtArray,
} from 'runtypes';
import ItemTypes from './ItemTypes';

const style: CSSProperties = {
  border: '1px black solid',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

interface CardProps {
  label: string;
}

export const CardType = RtRecord({
  id: RtNumber,
  columnId: RtNumber,
  label: RtString,
});

export const Cards = RtArray(CardType);

// interface DropResult {
//   label: string;
// }

function Card({ label }: CardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.6 : 1;
  return (
    <div
      ref={drag}
      role="listitem"
      style={{ ...style, opacity }}
      data-testid={`card-${label}`}
    >
      {label}
    </div>
  );
}

export default Card;
