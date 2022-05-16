import {
  String as RtString,
  Array as RtArray,
  Record as RtRecord,
  /* Static as RtStatic */
} from 'runtypes';

export const ColumnType = RtRecord({
  id: RtString,
  label: RtString,
});

export const Columns = RtArray(ColumnType);
