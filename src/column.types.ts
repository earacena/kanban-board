import {
  String as RtString,
  Number as RtNumber,
  Array as RtArray,
  Record as RtRecord,
  /* Static as RtStatic */
} from 'runtypes';

export const ColumnType = RtRecord({
  id: RtNumber,
  label: RtString,
});

export const Columns = RtArray(ColumnType);
