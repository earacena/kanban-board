import {
  String as RtString,
  Record as RtRecord,
  Array as RtArray,
  Optional as RtOptional,
  Static as RtStatic,
} from 'runtypes';
import { UniqueIdentifier } from '@dnd-kit/core';
import { TagsType } from '../../Tag';
import { Tags } from '../../Tag/types/tag.types';

export const CardActivityType = RtRecord({
  id: RtString,
  date: RtString.withConstraint((d) => !Number.isNaN(Date.parse(d))),
  content: RtString,
  type: RtString,
});

export const CardActivityArrayType = RtArray(CardActivityType);

export const CardType = RtRecord({
  id: RtString,
  columnId: RtString,
  brief: RtString,
  body: RtOptional(RtString),
  color: RtOptional(RtString),
  tags: RtOptional(
    RtArray(
      RtRecord({
        id: RtString,
        label: RtString,
        color: RtString,
      }),
    ),
  ),
  activity: CardActivityArrayType,
});

export const CardArrayType = RtArray(CardType);

export type Card = RtStatic<typeof CardType>;

export type Cards = RtStatic<typeof CardArrayType>;

export type CardActivityEvent = RtStatic<typeof CardActivityType>;
export type CardActivity = RtStatic<typeof CardActivityArrayType>;

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

export type AddCardActivity = {
  cardId: string,
  type: string,
  content: string,
};
