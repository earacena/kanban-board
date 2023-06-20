import { z } from 'zod';
import { UniqueIdentifier } from '@dnd-kit/core';

export const zCard = z.object({
  id: z.string(),
  columnId: z.string(),
  brief: z.string(),
  body: z.string(),
  color: z.string(),
  dateCreated: z.string().datetime(),
});

export const zCards = z.array(zCard);

export type CardType = z.infer<typeof zCard>;

export type CardArrayType = z.infer<typeof zCards>;

export interface SetCardsPayload { allCards: CardArrayType }

export interface AddCardPayload {
  card: CardType,
}
export interface RemoveCardPayload {
  cardId: UniqueIdentifier
}

export interface RemoveCardsWithColumnIdPayload {
  columnId: string
}

export interface SetCardColumnIdPayload {
  cardId: UniqueIdentifier
  newColumnId: UniqueIdentifier
}

export interface UpdateCardPayload {
  updatedCard: CardType,
}

export interface UpdateCardBriefPayload {
  id: string
  newBrief: string
}

export interface UpdateCardBodyPayload {
  id: string
  newBody: string
}

export interface SetActiveCardIdPayload {
  activeCardId: UniqueIdentifier
}

export interface RemoveTagFromAllCardsPayload {
  tagId: string,
}
