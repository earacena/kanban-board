import { z } from 'zod';

export const Tag = z.object({
  id: z.string(),
  cardId: z.string(),
  userId: z.string(),
  label: z.string(),
  color: z.string(),
});

export const Tags = z.array(Tag);

export type TagType = z.infer<typeof Tag>;
export type TagArrayType = z.infer<typeof Tags>;

export type SetTagsPayload = {
  allTags: TagArrayType,
};

export type AddTagPayload = {
  cardId: string,
  userId: string,
  label: string,
  color: string,
};

export type RemoveTagPayload = {
  tagId: string,
};
