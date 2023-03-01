import React from 'react';
import { useAppSelector } from '../../hooks';
import Board from './Board';

function Boards() {
  const allBoards = useAppSelector((state) => state.boards.allBoards);

  return (
    <ul>
      {
        allBoards.map((b) => (
          <li key={b.id}>
            <Board board={b} />
          </li>
        ))
      }
    </ul>
  );
}

export default Boards;
