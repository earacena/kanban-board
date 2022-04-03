/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GiOpenBook } from 'react-icons/gi';
import { Modal } from '@mantine/core';

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
  const [cardModalOpened, setCardModalOpened] = useState(false);

  console.log(`Card ${id} - ${columnId}`);

  return (
    <div css={{
      display: 'flex',
      margin: 'auto',
      justifyContent: 'space-evenly',
    }}
    >
      <span>
        {brief}
        {body !== '' && (
          <button type="button" css={{ backgroundColor: 'white', border: 'none' }} onClick={() => setCardModalOpened(true)}>
            <GiOpenBook />
          </button>
        )}
      </span>
      <Modal
        opened={cardModalOpened}
        onClose={() => setCardModalOpened(false)}
      >
        <div css={{ width: '100%', borderBottom: '1px grey solid' }}>
          {brief}
        </div>
        {body}
      </Modal>
    </div>
  );
}

export default Card;
