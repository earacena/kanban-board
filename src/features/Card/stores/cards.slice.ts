import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type {
  AddCardActivity,
  AddCardPayload,
  Cards,
  RemoveCardPayload,
  RemoveCardsWithColumnIdPayload,
  SetActiveCardIdPayload,
  SetCardColumnIdPayload,
  SetCardsPayload,
  UpdateCardBodyPayload,
  UpdateCardBriefPayload,
  UpdateTagsPayload,
} from '../types/card.types';

type CardsState = {
  allCards: Cards;
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
      allCards: state.allCards.concat({
        id: `card-${uuidv4()}`,
        columnId: action.payload.columnId,
        brief: action.payload.brief,
        body: action.payload.body,
        color: action.payload.color,
        tags: action.payload.tags,
        activity: [
          {
            id: uuidv4(),
            dateInMs: Date.now(),
            type: 'task created',
            content: `'${action.payload.brief}' task created.`,
          },
        ],
      }),
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
    updateTags: (
      state: CardsState,
      action: PayloadAction<UpdateTagsPayload>,
    ) => {
      const { id, updatedTags } = action.payload;

      return {
        ...state,
        allCards: state.allCards.map((c) => (c.id === id ? { ...c, tags: updatedTags } : c)),
      };
    },
    addCardActivity: (
      state: CardsState,
      action: PayloadAction<AddCardActivity>,
    ) => ({
      ...state,
      allCards: state.allCards.map((c) => (c.id === action.payload.cardId
        ? {
          ...c,
          activity: c.activity.concat({
            id: uuidv4(),
            dateInMs: Date.now(),
            type: action.payload.type,
            content: action.payload.content,
          }),
        }
        : c)),
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
  updateCardBrief,
  updateCardBody,
  setActiveCardId,
  resetActiveCardId,
  addCardActivity,
  updateTags,
  resetCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
