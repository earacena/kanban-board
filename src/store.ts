import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cards.slice';
import columnsReducer from './columns.slice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
