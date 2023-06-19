import { configureStore } from '@reduxjs/toolkit';
// import throttle from 'lodash/throttle';
import { cardsReducer } from './features/Card';
import { columnsReducer } from './features/Column';
import { tagsReducer } from './features/Tag';
import { settingsReducer } from './features/Settings';
import { boardsReducer } from './features/Board';
import { authReducer } from './features/Auth';
import { activityReducer } from './features/Activity';
// import { saveState } from './features/App/localStorage';

const store = configureStore({
  reducer: {
    activity: activityReducer,
    auth: authReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    cards: cardsReducer,
    tags: tagsReducer,
    settings: settingsReducer,
  },
// preloadedState: loadState(),
});

// Save changes to state in browser
// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }, 1000));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
