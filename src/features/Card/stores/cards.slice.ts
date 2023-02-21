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
    updateCardBrief: (state, action) => {
      const { id, newBrief } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (
          (c.id === id) ? ({ ...c, brief: newBrief }) : c
        )),
      };
    },
    updateCardBody: (state, action) => {
      const { id, newBody } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (
          (c.id === id) ? ({ ...c, body: newBody }) : c
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
    updateTags: (state, action) => {
      const { id, updatedTags } = action.payload;

      return {
        ...state,
        allCards: state.allCards.map((c) => ((c.id === id) ? ({ ...c, tags: updatedTags }) : c)),
      };
    },
    resetCards: () => initialState,
  },
});

export const {
  setCards,
  addCard,
  removeCard,
  removeCardsWithColumnId,
  setCardColumnId,
  updateCardBrief,
  updateCardBody,
  setActiveCardId,
  resetActiveCardId,
  updateTags,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
