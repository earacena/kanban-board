import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type {
  AddTagPayload,
  RemoveTagPayload,
  SetTagsPayload,
  Tags,
} from '../types/tag.types';

type TagsState = {
  allTags: Tags;
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
    removeTag: (state: TagsState, action: PayloadAction<RemoveTagPayload>) => ({
      ...state,
      allTags: state.allTags.filter((t) => t.id !== action.payload.tagId),
    }),
    resetTags: () => initialState,
  },
});

export const {
  setTags, addTag, removeTag, resetTags,
} = tagsSlice.actions;

export default tagsSlice.reducer;
