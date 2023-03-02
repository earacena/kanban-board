import { v4 as uuidv4 } from 'uuid';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AddBoardPayload,
  Boards,
  RemoveBoardPayload,
  SetBoardsPayload,
  SetSelectedBoardPayload,
} from '../types/board.types';

type BoardsState = {
  allBoards: Boards,
  selectedBoardId: string,
};

const initialState: BoardsState = {
  allBoards: [],
  selectedBoardId: '',
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
    addBoard: (state: BoardsState, action: PayloadAction<AddBoardPayload>) => {
      const newBoardId = uuidv4();
      return {
        ...state,
        allBoards: state.allBoards.concat({
          id: newBoardId,
          label: action.payload.label,
        }),
        selectedBoardId: newBoardId,
      };
    },
    setSelectedBoard: (state: BoardsState, action: PayloadAction<SetSelectedBoardPayload>) => ({
      ...state,
      selectedBoardId: action.payload.boardId,
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
  setSelectedBoard,
} = boardsSlice.actions;

export default boardsSlice.reducer;
