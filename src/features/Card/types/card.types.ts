import { z } from 'zod';
import { UniqueIdentifier } from '@dnd-kit/core';
import { TagsType } from '../../Tag';
import { Tags } from '../../Tag/types/tag.types';

export const zActivity = z.object({
  id: z.string(),
  dateInMs: z.number(),
  content: z.string(),
  type: z.string(),
});

export const zActivities = z.array(zActivity);

export const zCard = z.object({
  id: z.string(),
  columnId: z.string(),
  brief: z.string(),
  body: z.optional(z.string()),
  color: z.optional(z.string()),
  tags: z.optional(
    z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        color: z.string(),
      }),
    ),
  ),
  activity: zActivities,
});

export const zCards = z.array(zCard);

export type CardType = z.infer<typeof zCard>;

export type CardArrayType = z.infer<typeof zCards>;

export type ActivityType = z.infer<typeof zActivity>;
export type CardActivity = z.infer<typeof zActivities>;

export type SetCardsPayload = { allCards: CardArrayType };

export type AddCardPayload = {
  card: CardType,
};
export type RemoveCardPayload = {
  cardId: UniqueIdentifier;
};

export type RemoveCardsWithColumnIdPayload = {
  columnId: string;
};

export type SetCardColumnIdPayload = {
  cardId: UniqueIdentifier;
  newColumnId: UniqueIdentifier;
};

export type UpdateCardBriefPayload = {
  id: string;
  newBrief: string;
};

export type UpdateCardBodyPayload = {
  id: string;
  newBody: string;
};

export type SetActiveCardIdPayload = {
  activeCardId: UniqueIdentifier;
};

export type UpdateTagsPayload = {
  id: string;
  updatedTags: Tags;
};

export type AddCardActivityPayload = {
  cardId: string,
  type: string,
  content: string,
};

export type RemoveTagFromAllCardsPayload = {
  tagId: string,
};
