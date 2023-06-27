import { z } from 'zod';

export const zTag = z.object({
  id: z.string(),
  cardIds: z.array(z.string().uuid()),
  userId: z.string(),
  label: z.string(),
  color: z.string(),
});

export const zTags = z.array(zTag);

export type TagType = z.infer<typeof zTag>;
export type TagArrayType = z.infer<typeof zTags>;

export type SetTagsPayload = {
  allTags: TagArrayType,
};

export type AddTagPayload = {
  tag: TagType,
};

export type RemoveTagPayload = {
  tagId: string,
};

export type UpdateTagPayload = {
  tagId: string,
  tag: TagType,
};
