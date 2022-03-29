import {
  String as RtString,
  Record as RtRecord,
  Array as RtArray,
} from 'runtypes';

export const CardType = RtRecord({
  id: RtString,
  columnId: RtString,
  label: RtString,
  body: RtString,
});

export const Cards = RtArray(CardType);
