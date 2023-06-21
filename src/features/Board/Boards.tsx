/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { BsPlus } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Board from './Board';
import BoardForm from './BoardForm';
import { cardFormButtonLabelStyle, cardFormButtonStyle } from '../Column/styles/column.styles';
import { ErrorType } from '../Login/types/registerForm.types';
import logger from '../../util/Logger';
import boardServices from '../../services/board.service';
import { setBoards } from './stores/boards.slice';

function Boards() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.user);

  const allBoards = useAppSelector((state) => state.boards.allBoards);
  const [boardFormOpened, setBoardFormOpened] = useState<boolean>(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (session) {
          const fetchedBoards = await boardServices.fetchByUserId({ userId: session.id });
          dispatch(setBoards({ allBoards: fetchedBoards }));
        }
      } catch (err: unknown) {
        const decoded = ErrorType.parse(err);
        logger.logError(decoded);
      }
    };

    fetchBoards();
  }, [session]);

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
