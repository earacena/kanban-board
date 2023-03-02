/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { Button, Text } from '@mantine/core';
import { Board as BoardType } from './types/board.types';

type BoardProps = {
  board: BoardType,
};

function Board({ board }: BoardProps) {
  return (
    <Button
      style={{
        border: '1px lightgrey solid',
        margin: '4px',
        boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
        width: '300px',
        borderRadius: '4px',
      } as React.CSSProperties}
      variant="light"
      size="xl"
    >
      <Text truncate>
        {board.label}
      </Text>
    </Button>
  );
}

export default Board;
