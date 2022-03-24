import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Columns } from './column.types';

interface ColumnsState {
  highestId: number,
  allColumns: RtStatic<typeof Columns>,
}

const initialState: ColumnsState = {
  highestId: 0,
  allColumns: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action) => action.payload,
    addColumn: (state, action) => ({
      ...state,
      highestId: state.highestId + 1,
      allColumns: state.allColumns.concat({
        id: state.highestId + 1,
        label: action.payload.label,
      }),
    }),
    resetColumns: () => initialState,
  },
});

export const {
  setColumns,
  addColumn,
  resetColumns,
} = columnsSlice.actions;

export default columnsSlice.reducer;
