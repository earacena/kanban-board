import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  themeColor: string,
}

const initialState: SettingsState = {
  themeColor: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => action.payload,
    setThemeColor: (state, action) => ({
      ...state,
      themeColor: action.payload.themeColor,
    }),
  },
});

export const {
  setSettings,
  setThemeColor,
} = settingsSlice.actions;

export default settingsSlice.reducer;
