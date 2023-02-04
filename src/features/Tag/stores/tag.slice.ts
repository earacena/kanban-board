import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { v4 as uuidv4 } from 'uuid';
import { Tags } from '../types/tag.types';

type TagsState = {
  allTags: RtStatic<typeof Tags>,
};

const initialState: TagsState = {
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
      allTags: state.allTags.concat({
        id: `tag-${uuidv4()}`,
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
