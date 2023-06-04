import { v4 as uuidv4 } from 'uuid';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  AddBoardPayload,
  BoardArrayType,
  RemoveBoardPayload,
  SetBoardsPayload,
  SetSelectedBoardPayload,
  UpdateBoardLabelPayload,
} from '../types/board.types';

type BoardsState = {
  allBoards: BoardArrayType;
  selectedBoardId: string;
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
    addBoard: (state: BoardsState, action: PayloadAction<AddBoardPayload>) => ({
      ...state,
      allBoards: state.allBoards.concat(action.payload.board),
      selectedBoardId: action.payload.board.id,
    }),
    setSelectedBoard: (
      state: BoardsState,
      action: PayloadAction<SetSelectedBoardPayload>,
    ) => ({
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
    updateBoardLabel: (
      state: BoardsState,
      action: PayloadAction<UpdateBoardLabelPayload>,
    ) => ({
      ...state,
      allBoards: state.allBoards.map((b) => (
        b.id === action.payload.boardId
          ? { ...b, label: action.payload.newLabel }
          : b
      )),
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
  updateBoardLabel,
} = boardsSlice.actions;

export default boardsSlice.reducer;
