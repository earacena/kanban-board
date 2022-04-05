import {
  Array as RtArray,
  Record as RtRecord,
  String as RtString,
} from 'runtypes';

export const Tag = RtRecord({
  id: RtString,
  label: RtString,
  color: RtString,
});

export const Tags = RtArray(Tag);
