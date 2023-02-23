import {
  String as RtString,
  Array as RtArray,
  Record as RtRecord,
  Static as RtStatic,
} from 'runtypes';

export const ColumnType = RtRecord({
  id: RtString,
  label: RtString,
});

export const ColumnArrayType = RtArray(ColumnType);

export type Column = RtStatic<typeof ColumnType>;
export type Columns = RtStatic<typeof ColumnArrayType>;

export type SetColumnsPayload = {
  allColumns: Columns,
};

export type AddColumnPayload = {
  label: string,
};

export type DeleteColumnPayload = {
  id: string,
};

export type UpdateColumnPayload = {
  id: string,
  updatedColumn: Column,
};
