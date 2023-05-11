import { z } from 'zod';

export const ColumnType = z.object({
  id: z.string(),
  label: z.string(),
  boardId: z.string(),
});

export const ColumnArrayType = z.array(ColumnType);

export type Column = z.infer<typeof ColumnType>;
export type Columns = z.infer<typeof ColumnArrayType>;

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
