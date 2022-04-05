import {
  String as RtString,
  Record as RtRecord,
  Array as RtArray,
} from 'runtypes';

export const CardType = RtRecord({
  id: RtString,
  columnId: RtString,
  brief: RtString,
  body: RtString,
  color: RtString,
  tags: RtArray(
    RtRecord({
      id: RtString,
      label: RtString,
      color: RtString,
    }),
  ),
});

export const Cards = RtArray(CardType);
