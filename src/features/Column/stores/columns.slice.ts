import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  AddColumnPayload,
  ColumnArrayType,
  DeleteColumnPayload,
  SetColumnsPayload,
  UpdateColumnLabelPayload,
  UpdateColumnPayload,
} from '../types/column.types';

type ColumnsState = {
  allColumns: ColumnArrayType;
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
      allColumns: state.allColumns.concat(action.payload.column),
    }),
    deleteColumn: (
      state: ColumnsState,
      action: PayloadAction<DeleteColumnPayload>,
    ) => ({
      ...state,
      allColumns: state.allColumns.filter((c) => c.id !== action.payload.columnId),
    }),
    updateColumnLabel: (
      state: ColumnsState,
      action: PayloadAction<UpdateColumnLabelPayload>,
    ) => ({
      ...state,
      allColumns: state.allColumns.map((c) => (
        c.id === action.payload.columnId
          ? { ...c, label: action.payload.updatedColumnLabel }
          : c
      )),
    }),
    updateColumn: (
      state: ColumnsState,
      action: PayloadAction<UpdateColumnPayload>,
    ) => ({
      ...state,
      allColumns: state.allColumns.map((c) => (
        c.id === action.payload.updatedColumn.id
          ? action.payload.updatedColumn
          : c
      )),
    }),
    resetColumns: () => initialState,
  },
});

export const {
  setColumns,
  addColumn,
  deleteColumn,
  updateColumnLabel,
  updateColumn,
  resetColumns,
} = columnsSlice.actions;

export default columnsSlice.reducer;
