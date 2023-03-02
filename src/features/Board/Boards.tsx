/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { useAppSelector } from '../../hooks';
import Board from './Board';
import BoardForm from './BoardForm';
import { cardFormButtonLabelStyle, cardFormButtonStyle } from '../Column/styles/column.styles';

function Boards() {
  const allBoards = useAppSelector((state) => state.boards.allBoards);
  const [boardFormOpened, setBoardFormOpened] = useState<boolean>(false);

  return (
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ul css={{ padding: 0 }}>
        {
          allBoards.map((b) => (
            <li key={b.id} css={{ listStyle: 'none' }}>
              <Board board={b} />
            </li>
          ))
        }
      </ul>
      {boardFormOpened && <BoardForm setBoardFormOpened={setBoardFormOpened} />}
      {!boardFormOpened && (
        <Button
          css={cardFormButtonStyle}
          type="button"
          variant="subtle"
          onClick={() => setBoardFormOpened(true)}
        >
          <BsPlus size={19} />
          <span css={cardFormButtonLabelStyle}>ADD NEW BOARD</span>
        </Button>
      )}

    </div>
  );
}

export default Boards;
