import {
  Array as RtArray,
  Record as RtRecord,
  String as RtString,
  Static as RtStatic,
} from 'runtypes';

export const Tag = RtRecord({
  id: RtString,
  label: RtString,
  color: RtString,
});

export const TagArray = RtArray(Tag);
export type TagsType = RtStatic<typeof TagArray>;
