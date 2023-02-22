import {
  String as RtString,
  Record as RtRecord,
  Array as RtArray,
  Optional as RtOptional,
  Static as RtStatic,
} from 'runtypes';
import { TagsType } from '../../Tag';
import { Tags } from '../../Tag/types/tag.types';

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
});

export const CardArrayType = RtArray(CardType);

export type Card = RtStatic<typeof CardType>;

export type Cards = RtStatic<typeof CardArrayType>;

export type SetCardsPayload = { allCards: Cards };

export type AddCardPayload = {
  columnId: string;
  brief: string;
  body: string | undefined;
  color: string | undefined;
  tags: TagsType;
};
export type RemoveCardPayload = {
  id: string;
};

export type RemoveCardsWithColumnIdPayload = {
  columnId: string;
};

export type SetCardColumnIdPayload = {
  id: string;
  newColumnId: string;
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
  activeCardId: string;
};

export type UpdateTagsPayload = {
  id: string;
  updatedTags: Tags;
};
