import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { AddTagPayload, SetTagsPayload, Tags } from '../types/tag.types';

type TagsState = {
  allTags: Tags,
};

const initialState: TagsState = {
  allTags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state: TagsState, action: PayloadAction<SetTagsPayload>) => ({
      ...state,
      allCards: action.payload,
    }),
    addTag: (state: TagsState, action: PayloadAction<AddTagPayload>) => ({
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
