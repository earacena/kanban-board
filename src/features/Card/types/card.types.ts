import {
  String as RtString,
  Record as RtRecord,
  Array as RtArray,
  Optional as RtOptional,
} from 'runtypes';

export const CardType = RtRecord({
  id: RtString,
  columnId: RtString,
  brief: RtString,
  body: RtOptional(RtString),
  color: RtOptional(RtString),
  tags: RtOptional(RtArray(
    RtRecord({
      id: RtString,
      label: RtString,
      color: RtString,
    }),
  )),
});

export const Cards = RtArray(CardType);
