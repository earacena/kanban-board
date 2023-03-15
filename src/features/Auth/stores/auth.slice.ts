import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, SetIsFetchingPayload, SetUserPayload } from '../types/auth.types';

const initialState: AuthState = {
  user: undefined,
  isFetching: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state: AuthState,
      action: PayloadAction<SetUserPayload>,
    ) => ({
      ...state,
      user: action.payload.user,
    }),
    setIsFetching: (
      state: AuthState,
      action: PayloadAction<SetIsFetchingPayload>,
    ) => ({
      ...state,
      isFetching: action.payload.isFetching,
    }),
    resetUser: () => initialState,
  },
});

export const {
  setUser,
  setIsFetching,
  resetUser,
} = authSlice.actions;

export default authSlice.reducer;
