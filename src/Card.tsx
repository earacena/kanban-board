import React from 'react';
// import type { CSSProperties } from 'react';
import Draggable from './Draggable';

// const cardStyle: CSSProperties = {
//   border: '1px black solid',
//   backgroundColor: 'white',
//   padding: '0.5rem 1rem',
//   alignSelf: 'stretch',
//   cursor: 'move',
//   float: 'left',
//   margin: '0.5rem',
// };

interface CardProps {
  id: number;
  label: string;
  columnId: number,
}

function Card({
  id,
  label,
  columnId,
}: CardProps) {
  return (
    <Draggable key={id} id={id}>
      {`[${columnId}] ${label} - ${id}`}
    </Draggable>
  );
}

export default Card;
