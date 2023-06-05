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

export type SetColumnsPayload = {
  allColumns: ColumnArrayType,
};

export type AddColumnPayload = {
  column: ColumnType
};

export type DeleteColumnPayload = {
  columnId: string,
};

export type UpdateColumnPayload = {
  columnId: string,
  updatedColumnLabel: string,
};
