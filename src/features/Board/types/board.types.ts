import { z } from 'zod';

export const BoardType = z.object({
  id: z.string(),
  label: z.string(),
});

export const BoardArrayType = z.array(BoardType);
export type Board = z.infer<typeof BoardType>;
export type Boards = z.infer<typeof BoardArrayType>;

export type SetBoardsPayload = {
  allBoards: Boards,
};

export type AddBoardPayload = {
  label: string,
};

export type RemoveBoardPayload = {
  boardId: string,
};

export type SetSelectedBoardPayload = {
  boardId: string,
};

export interface UpdateBoardLabelPayload {
  boardId: string,
  newLabel: string,
}
