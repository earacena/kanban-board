import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Columns } from './Column';

const initialState: RtStatic<typeof Columns> = [];

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action) => action.payload,
    resetColumns: () => initialState,
  },
});

export const {
  setColumns,
  resetColumns,
} = columnsSlice.actions;

export default columnsSlice.reducer;
