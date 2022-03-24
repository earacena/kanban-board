import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cards.slice';
import columnsReducer from './columns.slice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    columns: columnsReducer,
  },
});

export default store;
