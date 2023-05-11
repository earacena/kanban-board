import { z } from 'zod';
import { UniqueIdentifier } from '@dnd-kit/core';
import { TagsType } from '../../Tag';
import { Tags } from '../../Tag/types/tag.types';

export const CardActivityType = z.object({
  id: z.string(),
  dateInMs: z.number(),
  content: z.string(),
  type: z.string(),
});

export const CardActivityArrayType = z.array(CardActivityType);

export const CardType = z.object({
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
  activity: CardActivityArrayType,
});

export const CardArrayType = z.array(CardType);

export type Card = z.infer<typeof CardType>;

export type Cards = z.infer<typeof CardArrayType>;

export type CardActivityEvent = z.infer<typeof CardActivityType>;
export type CardActivity = z.infer<typeof CardActivityArrayType>;

export type SetCardsPayload = { allCards: Cards };

export type AddCardPayload = {
  columnId: string;
  brief: string;
  body: string | undefined;
  color: string | undefined;
  tags: TagsType;
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
