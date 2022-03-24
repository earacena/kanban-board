import {
  Number as RtNumber,
  String as RtString,
  Record as RtRecord,
  Array as RtArray,
} from 'runtypes';

export const CardType = RtRecord({
  id: RtNumber,
  columnId: RtNumber,
  label: RtString,
});

export const Cards = RtArray(CardType);
