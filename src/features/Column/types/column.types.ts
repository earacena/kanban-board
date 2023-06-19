import { z } from 'zod';

export const zColumn = z.object({
  id: z.string(),
  userId: z.string().uuid(),
  label: z.string(),
  boardId: z.string(),
  dateCreated: z.coerce.date(),
});

export const zColumns = z.array(zColumn);

export type ColumnType = z.infer<typeof zColumn>;
export type ColumnArrayType = z.infer<typeof zColumns>;

export interface SetColumnsPayload {
  allColumns: ColumnArrayType,
}

export interface AddColumnPayload {
  column: ColumnType
}

export interface DeleteColumnPayload {
  columnId: string,
}

export interface UpdateColumnLabelPayload {
  columnId: string,
  updatedColumnLabel: string,
}

export interface UpdateColumnPayload {
  updatedColumn: ColumnType,
}
