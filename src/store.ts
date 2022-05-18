import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from './features/Card';
import { columnsReducer } from './features/Column';
import { tagsReducer } from './features/Tag';
import { settingsReducer } from './features/Settings';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    columns: columnsReducer,
    tags: tagsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
