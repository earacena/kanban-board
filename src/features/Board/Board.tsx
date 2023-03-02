/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { Button, Text } from '@mantine/core';
import { Board as BoardType } from './types/board.types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedBoard } from './stores/boards.slice';

type BoardProps = {
  board: BoardType,
};

function Board({ board }: BoardProps) {
  const dispatch = useAppDispatch();
  const selectedBoardId = useAppSelector((state) => state.boards.selectedBoardId);

  const handleClick = () => {
    dispatch(setSelectedBoard({ boardId: board.id }));
  };

  return (
    <Button
      style={{
        border: '1px lightgrey solid',
        margin: '4px',
        boxShadow: '0px 3px 10px rgb(0, 0, 0, 0.2)',
        width: '300px',
        borderRadius: '4px',
      } as React.CSSProperties}
      variant={selectedBoardId === board.id ? 'light' : 'default'}
      size="xl"
      onClick={handleClick}
    >
      <Text truncate>
        {board.label}
      </Text>
    </Button>
  );
}

export default Board;
