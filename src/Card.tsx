/** @jsxRuntime classic */
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GiOpenBook } from 'react-icons/gi';
import { Modal, Badge } from '@mantine/core';
import { Static as RtStatic } from 'runtypes';
import { Tags } from './tag.types';
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
  tags: RtStatic<typeof Tags>,
}

function Card({
  id,
  columnId,
  brief,
  body,
  tags,
}: CardProps) {
  const [cardModalOpened, setCardModalOpened] = useState(false);

  console.log(`Card ${id} - ${columnId}`);

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
    }}
    >
      <div>
        {brief}
        {body !== '' && (
          <button type="button" css={{ backgroundColor: 'white', border: 'none' }} onClick={() => setCardModalOpened(true)}>
            <GiOpenBook />
          </button>
        )}
      </div>
      <div>
        {tags.map((tag) => (
          <Badge
            color={tag.color}
            size="sm"
            variant="outline"
            css={{
              margin: '0.1rem',
            }}
            key={tag.id}
          >
            {tag.label}
          </Badge>
        ))}
      </div>
      <Modal
        opened={cardModalOpened}
        onClose={() => setCardModalOpened(false)}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            borderBottom: '1px grey solid',
            marginBottom: '1rem',
          }}
        >
          <p
            css={{
              marginTop: '0',
              alignSelf: 'center',
              color: 'gray',
              fontSize: '20px',
            }}
          >
            {brief}
          </p>
          <div css={{ margin: 'auto', marginBottom: '0.5rem' }}>
            {tags.map((tag) => (
              <Badge
                color={tag.color}
                variant="outline"
                css={{
                  '&:hover': {
                    backgroundColor: 'lightgray',
                  },
                }}
                key={tag.id}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
        {body}
      </Modal>
    </div>
  );
}

export default Card;
