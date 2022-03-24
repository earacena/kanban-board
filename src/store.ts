import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cards.slice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export default store;
