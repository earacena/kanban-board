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
  id: string;
  label: string;
  columnId: string,
  body: string,
}

function Card({
  id,
  label,
  columnId,
  body,
}: CardProps) {
  console.log(`Card ${id} ${label} ${columnId}`);
  return (
    <div>
      <div style={{ borderBottom: '1px grey solid' }}>
        {label}
      </div>

      {body}
    </div>
  );
}

export default Card;
