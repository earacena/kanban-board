import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Static as RtStatic } from 'runtypes';
import { Cards } from '../types/card.types';

type CardsState = {
  allCards: RtStatic<typeof Cards>,
  activeCardId: string,
};

const initialState: CardsState = {
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
      allCards: state.allCards.concat({
        id: `card-${uuidv4()}`,
        columnId: action.payload.columnId,
        brief: action.payload.brief,
        body: action.payload.body,
        color: action.payload.color,
        tags: action.payload.tags,
      }),
    }),
    removeCard: (state, action) => ({
      ...state,
      allCards: state.allCards.filter((c) => c.id !== action.payload.id),
    }),
    removeCardsWithColumnId: (state, action) => ({
      ...state,
      allCards: state.allCards.filter((c) => c.columnId !== action.payload.id),
    }),
    setCardColumnId: (state, action) => {
      const { id, newColumnId } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (c.id === id ? { ...c, columnId: newColumnId } : c)),
      };
    },
    updateCardBriefBody: (state, action) => {
      const { id, newBrief, newBody } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (
          (c.id === id) ? ({ ...c, brief: newBrief, body: newBody }) : c
        )),
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
  removeCard,
  removeCardsWithColumnId,
  setCardColumnId,
  updateCardBriefBody,
  setActiveCardId,
  resetActiveCardId,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
