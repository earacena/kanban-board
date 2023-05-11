import { z } from 'zod';

export const TagType = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string(),
});

export const TagArrayType = z.array(TagType);

export type Tag = z.infer<typeof TagType>;
export type Tags = z.infer<typeof TagArrayType>;

export type SetTagsPayload = {
  allTags: Tags,
};

export type AddTagPayload = {
  label: string,
  color: string,
};

export type RemoveTagPayload = {
  tagId: string,
};
