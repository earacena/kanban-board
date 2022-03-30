import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Cards } from './card.types';

interface CardsState {
  nextAvailableId: number,
  allCards: RtStatic<typeof Cards>,
  activeCardId: string,
}

const initialState: CardsState = {
  nextAvailableId: 1,
  allCards: [],
  activeCardId: '',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => ({
      ...state,
      allCards: action.payload,
    }),
    addCard: (state, action) => ({
      ...state,
      nextAvailableId: state.nextAvailableId + 1,
      allCards: state.allCards.concat({
        id: `card-${state.nextAvailableId}`,
        columnId: action.payload.columnId,
        label: action.payload.label,
        body: action.payload.body,
        color: action.payload.color,
      }),
    }),
    setCardColumnId: (state, action) => {
      const { id, newColumnId } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (c.id === id ? { ...c, columnId: newColumnId } : c)),
      };
    },
    setActiveCardId: (state, action) => ({
      ...state,
      activeCardId: action.payload,
    }),
    resetActiveCardId: (state) => ({
      ...state,
      activeCardId: initialState.activeCardId,
    }),
    resetCards: () => initialState,
  },
});

export const {
  setCards,
  addCard,
  setCardColumnId,
  setActiveCardId,
  resetActiveCardId,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
