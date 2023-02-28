import {
  Record as RtRecord,
  String as RtString,
  Array as RtArray,
  Static as RtStatic,
} from 'runtypes';

export const BoardType = RtRecord({
  id: RtString,
  label: RtString,
  columnId: RtString,
});

export const BoardArrayType = RtArray(BoardType);

export type Board = RtStatic<typeof BoardType>;
export type Boards = RtStatic<typeof BoardArrayType>;
