import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActivityArrayType, AddActivitiesPayload, SetActivitiesPayload } from '../types/activity.types';

interface ActivitiesState {
  allActivities: ActivityArrayType,
}

const initialState: ActivitiesState = {
  allActivities: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (
      state: ActivitiesState,
      action: PayloadAction<SetActivitiesPayload>,
    ) => ({
      ...state,
      allActivities: action.payload.activities,
    }),
    addActivity: (
      state: ActivitiesState,
      action: PayloadAction<AddActivitiesPayload>,
    ) => ({
      ...state,
      allActivities: state.allActivities.concat(action.payload.activity),
    }),
    resetActivities: () => initialState,
  },
});

export const {
  setActivities,
  addActivity,
  resetActivities,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
