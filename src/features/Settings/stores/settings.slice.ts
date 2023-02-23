import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  themeColor: string;
};

type SetSettingsPayload = {
  settings: SettingsState;
};

type SetThemeColorPayload = {
  themeColor: string;
};

const initialState: SettingsState = {
  themeColor: '#00806f',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (
      state: SettingsState,
      action: PayloadAction<SetSettingsPayload>,
    ) => action.payload.settings,
    setThemeColor: (state: SettingsState, action: PayloadAction<SetThemeColorPayload>) => ({
      ...state,
      themeColor: action.payload.themeColor,
    }),
  },
});

export const { setSettings, setThemeColor } = settingsSlice.actions;

export default settingsSlice.reducer;
