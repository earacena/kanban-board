import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Cards } from './card.types';

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
    setCardColumnId: (state, action) => {
      const { id, newColumnId } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (c.id === id ? { ...c, columnId: newColumnId } : c)),
      };
    },
    resetCards: () => initialState,
  },
});

export const {
  setCards,
  addCard,
  setCardColumnId,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
