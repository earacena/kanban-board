import { v4 as uuidv4 } from 'uuid';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AddBoardPayload,
  Boards,
  RemoveBoardPayload,
  SetBoardsPayload,
} from '../types/board.types';

type BoardsState = {
  allBoards: Boards;
};

const initialState: BoardsState = {
  allBoards: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (
      state: BoardsState,
      action: PayloadAction<SetBoardsPayload>,
    ) => ({
      ...state,
      allBoards: action.payload.allBoards,
    }),
    addBoard: (state: BoardsState, action: PayloadAction<AddBoardPayload>) => ({
      ...state,
      allBoards: state.allBoards.concat({
        id: `${uuidv4()}`,
        label: action.payload.label,
        columnIds: [],
      }),
    }),
    removeBoard: (
      state: BoardsState,
      action: PayloadAction<RemoveBoardPayload>,
    ) => ({
      ...state,
      allBoards: state.allBoards.filter((b) => b.id !== action.payload.boardId),
    }),
    resetBoards: () => initialState,
  },
});

export const {
  setBoards,
  addBoard,
  removeBoard,
  resetBoards,
} = boardsSlice.actions;

export default boardsSlice.reducer;
