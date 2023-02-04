import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import { cardsReducer } from './features/Card';
import { columnsReducer } from './features/Column';
import { tagsReducer } from './features/Tag';
import { settingsReducer } from './features/Settings';
import { saveState } from './features/App/localStorage';

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

// Save changes to state in browser
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
