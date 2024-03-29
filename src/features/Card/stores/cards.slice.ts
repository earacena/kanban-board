import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  AddCardPayload,
  CardArrayType,
  RemoveCardPayload,
  RemoveCardsWithColumnIdPayload,
  SetActiveCardIdPayload,
  SetCardColumnIdPayload,
  SetCardsPayload,
  UpdateCardBodyPayload,
  UpdateCardBriefPayload,
  UpdateCardPayload,
} from '../types/card.types';

type CardsState = {
  allCards: CardArrayType;
  activeCardId: string;
};

const initialState: CardsState = {
  allCards: [],
  activeCardId: '',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state: CardsState, action: PayloadAction<SetCardsPayload>) => ({
      ...state,
      allCards: action.payload.allCards,
    }),
    addCard: (state: CardsState, action: PayloadAction<AddCardPayload>) => ({
      ...state,
      allCards: state.allCards.concat(action.payload.card),
    }),
    removeCard: (
      state: CardsState,
      action: PayloadAction<RemoveCardPayload>,
    ) => ({
      ...state,
      allCards: state.allCards.filter((c) => c.id !== action.payload.cardId),
    }),
    removeCardsWithColumnId: (
      state: CardsState,
      action: PayloadAction<RemoveCardsWithColumnIdPayload>,
    ) => ({
      ...state,
      allCards: state.allCards.filter(
        (c) => c.columnId !== action.payload.columnId,
      ),
    }),
    setCardColumnId: (
      state: CardsState,
      action: PayloadAction<SetCardColumnIdPayload>,
    ) => {
      const { cardId, newColumnId } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map(
          (c) => (c.id === cardId ? { ...c, columnId: String(newColumnId) } : c),
        ),
      };
    },
    updateCard: (
      state: CardsState,
      action: PayloadAction<UpdateCardPayload>,
    ) => ({
      ...state,
      allCards: state.allCards.map((c) => (
        (c.id === action.payload.updatedCard.id)
          ? action.payload.updatedCard
          : c)),
    }),
    updateCardBrief: (
      state: CardsState,
      action: PayloadAction<UpdateCardBriefPayload>,
    ) => {
      const { id, newBrief } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (c.id === id ? { ...c, brief: newBrief } : c)),
      };
    },
    updateCardBody: (
      state: CardsState,
      action: PayloadAction<UpdateCardBodyPayload>,
    ) => {
      const { id, newBody } = action.payload;
      return {
        ...state,
        allCards: state.allCards.map((c) => (c.id === id ? { ...c, body: newBody } : c)),
      };
    },
    setActiveCardId: (
      state: CardsState,
      action: PayloadAction<SetActiveCardIdPayload>,
    ) => ({
      ...state,
      activeCardId: String(action.payload.activeCardId),
    }),
    resetActiveCardId: (state: CardsState) => ({
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
  updateCard,
  updateCardBrief,
  updateCardBody,
  setActiveCardId,
  resetActiveCardId,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
