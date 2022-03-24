import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Cards } from './Card';

interface CardsState {
  highestId: number,
  allCards: RtStatic<typeof Cards>,
}

const initialState: CardsState = {
  highestId: 0,
  allCards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => action.payload,
    addCard: (state, action) => ({
      ...state,
      highestId: state.highestId + 1,
      allCards: state.allCards.concat({
        id: state.highestId + 1,
        columnId: action.payload.columnId,
        label: action.payload.label,
      }),
    }),
    resetCards: () => initialState,
  },
});

export const {
  setCards,
  addCard,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
