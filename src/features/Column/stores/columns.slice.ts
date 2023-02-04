import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Static as RtStatic } from 'runtypes';
import { Columns } from '../types/column.types';

type ColumnsState = {
  allColumns: RtStatic<typeof Columns>,
};

const initialState: ColumnsState = {
  allColumns: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action) => action.payload,
    addColumn: (state, action) => ({
      ...state,
      allColumns: state.allColumns.concat({
        id: `column-${uuidv4()}`,
        label: action.payload.label,
      }),
    }),
    deleteColumn: (state, action) => ({
      ...state,
      allColumns: state.allColumns.filter((c) => c.id !== action.payload.id),
    }),
    updateColumn: (state, action) => ({
      ...state,
      allColumns: state.allColumns.map((c) => ((c.id === action.payload.id) ? action.payload : c)),
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
