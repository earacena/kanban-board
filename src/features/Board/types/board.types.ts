import { z } from 'zod';

export const zBoard = z.object({
  id: z.string().uuid(),
  label: z.string(),
  userId: z.string().uuid(),
  dateCreated: z.string().datetime(),
});
export const zBoards = z.array(zBoard);

export type BoardType = z.infer<typeof zBoard>;
export type BoardArrayType = z.infer<typeof zBoards>;

export type SetBoardsPayload = {
  allBoards: BoardArrayType,
};

export type AddBoardPayload = {
  board: BoardType,
};

export type RemoveBoardPayload = {
  boardId: string,
};

export type SetSelectedBoardPayload = {
  boardId: string,
};

export interface UpdateBoardPayload {
  updatedBoard: BoardType,
}

export interface UpdateBoardLabelPayload {
  boardId: string,
  newLabel: string,
}
