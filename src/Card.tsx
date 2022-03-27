import React from 'react';
// import type { CSSProperties } from 'react';

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
    <div>
      {`[${columnId}] ${label} - ${id}`}
    </div>
  );
}

export default Card;
