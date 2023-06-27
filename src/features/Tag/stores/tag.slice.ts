import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type {
  AddTagPayload,
  RemoveTagPayload,
  SetTagsPayload,
  TagArrayType,
  UpdateTagPayload,
} from '../types/tag.types';

type TagsState = {
  allTags: TagArrayType;
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
      allTags: state.allTags.concat(action.payload.tag),
    }),
    removeTag: (state: TagsState, action: PayloadAction<RemoveTagPayload>) => ({
      ...state,
      allTags: state.allTags.filter((t) => t.id !== action.payload.tagId),
    }),
    updateTag: (state: TagsState, action: PayloadAction<UpdateTagPayload>) => ({
      ...state,
      allTags: state.allTags.map(
        (t) => (t.id === action.payload.tagId ? action.payload.tag : t),
      ),
    }),
    resetTags: () => initialState,
  },
});

export const {
  setTags, addTag, removeTag, resetTags, updateTag,
} = tagsSlice.actions;

export default tagsSlice.reducer;
