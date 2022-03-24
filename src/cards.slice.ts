import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Cards } from './Card';

const initialState: RtStatic<typeof Cards> = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => action.payload,
    resetCards: () => initialState,
  },
});

export const {
  setCards,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
