import {
  String as RtString,
  Array as RtArray,
  Record as RtRecord,
  Static as RtStatic,
} from 'runtypes';

export const ColumnType = RtRecord({
  id: RtString,
  label: RtString,
  boardId: RtString,
});

export const ColumnArrayType = RtArray(ColumnType);

export type Column = RtStatic<typeof ColumnType>;
export type Columns = RtStatic<typeof ColumnArrayType>;

export type SetColumnsPayload = {
  allColumns: Columns,
};

export type AddColumnPayload = {
  label: string,
  boardId: string,
};

export type DeleteColumnPayload = {
  columnId: string,
};

export type UpdateColumnPayload = {
  columnId: string,
  updatedColumnLabel: string,
};
