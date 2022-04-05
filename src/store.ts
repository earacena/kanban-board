import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cards.slice';
import columnsReducer from './columns.slice';
import tagsReducer from './tag.slice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    columns: columnsReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
