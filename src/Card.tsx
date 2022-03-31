/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GiOpenBook } from 'react-icons/gi';

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
  columnId: string,
  brief: string;
  body: string,
}

function Card({
  id,
  columnId,
  brief,
  body,
}: CardProps) {
  const [bodyVisible, setBodyVisible] = useState(false);

  console.log(`Card ${id} - ${columnId}`);

  const handleClick = () => setBodyVisible(!bodyVisible);

  return (
    <div css={{
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'space-evenly',
    }}
    >
      {!bodyVisible && brief}
      {!bodyVisible && (
        <button type="button" css={{ backgroundColor: 'white', border: 'none' }} onClick={handleClick}>
          <GiOpenBook />
        </button>
      )}
      {bodyVisible && (
        <div>
          <div css={{ borderBottom: '1px grey solid' }}>
            {brief}
            <button type="button" css={{ backgroundColor: 'white', border: 'none' }} onClick={handleClick}>
              <GiOpenBook />
            </button>
          </div>
          {body}
        </div>
      )}
    </div>
  );
}

export default Card;
