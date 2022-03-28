import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Columns } from './column.types';

interface ColumnsState {
  nextAvailableId: number,
  allColumns: RtStatic<typeof Columns>,
}

const initialState: ColumnsState = {
  nextAvailableId: 1,
  allColumns: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action) => action.payload,
    addColumn: (state, action) => ({
      ...state,
      nextAvailableId: state.nextAvailableId + 1,
      allColumns: state.allColumns.concat({
        id: `column-${state.nextAvailableId}`,
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
