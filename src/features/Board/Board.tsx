import React from 'react';
import { Board as BoardType } from './types/board.types';

type BoardProps = {
  board: BoardType,
};

function Board({ board }: BoardProps) {
  return (
    <div>
      {board.label}
    </div>
  );
}

export default Board;
