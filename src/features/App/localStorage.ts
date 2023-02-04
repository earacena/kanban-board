import type { RootState } from './types/app.types';

export function loadState() {
  // Load serialized state from browser's local storage
  try {
    const kanbanAppStateJSON = window.localStorage.getItem('kanbanAppState');
    return kanbanAppStateJSON === null ? undefined : JSON.parse(kanbanAppStateJSON);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function saveState(kanbanAppState: RootState) {
  // Save serialized state to browser's local storage
  try {
    const serializedState = JSON.stringify(kanbanAppState);
    window.localStorage.setItem('kanbanAppState', serializedState);
  } catch (e) {
    console.error(e);
  }
}
