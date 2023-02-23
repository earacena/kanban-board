import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type {
  AddColumnPayload,
  Columns,
  DeleteColumnPayload,
  SetColumnsPayload,
  UpdateColumnPayload,
} from '../types/column.types';

type ColumnsState = {
  allColumns: Columns;
};

const initialState: ColumnsState = {
  allColumns: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (
      state: ColumnsState,
      action: PayloadAction<SetColumnsPayload>,
    ) => ({
      ...state,
      allColumns: action.payload.allColumns,
    }),
    addColumn: (
      state: ColumnsState,
      action: PayloadAction<AddColumnPayload>,
    ) => ({
      ...state,
      allColumns: state.allColumns.concat({
        id: `column-${uuidv4()}`,
        label: action.payload.label,
      }),
    }),
    deleteColumn: (
      state: ColumnsState,
      action: PayloadAction<DeleteColumnPayload>,
    ) => ({
      ...state,
      allColumns: state.allColumns.filter((c) => c.id !== action.payload.id),
    }),
    updateColumn: (
      state: ColumnsState,
      action: PayloadAction<UpdateColumnPayload>,
    ) => ({
      ...state,
      allColumns: state.allColumns.map((c) => (
        c.id === action.payload.id ? action.payload.updatedColumn : c
      )),
    }),
    resetColumns: () => initialState,
  },
});

export const {
  setColumns,
  addColumn,
  deleteColumn,
  updateColumn,
  resetColumns,
} = columnsSlice.actions;

export default columnsSlice.reducer;
