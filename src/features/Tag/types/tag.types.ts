import {
  Array as RtArray,
  Record as RtRecord,
  String as RtString,
  Static as RtStatic,
} from 'runtypes';

export const TagType = RtRecord({
  id: RtString,
  label: RtString,
  color: RtString,
});

export const TagArrayType = RtArray(TagType);

export type Tag = RtStatic<typeof TagType>;
export type Tags = RtStatic<typeof TagArrayType>;
