import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Tags } from '../types/tag.types';

interface TagsState {
  nextAvailableId: number,
  allTags: RtStatic<typeof Tags>,
}

const initialState: TagsState = {
  nextAvailableId: 1,
  allTags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action) => ({
      ...state,
      allCards: action.payload,
    }),
    addTag: (state, action) => ({
      ...state,
      nextAvailableId: state.nextAvailableId + 1,
      allTags: state.allTags.concat({
        id: `tag-${state.nextAvailableId}`,
        label: action.payload.label,
        color: action.payload.color,
      }),
    }),
    resetTags: () => initialState,
  },
});

export const {
  setTags,
  addTag,
  resetTags,
} = tagsSlice.actions;

export default tagsSlice.reducer;
