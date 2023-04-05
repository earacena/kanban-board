import {
  Record as RtRecord,
  String as RtString,
  Array as RtArray,
  Static as RtStatic,
} from 'runtypes';

export const BoardType = RtRecord({
  id: RtString,
  label: RtString,
});

export const BoardArrayType = RtArray(BoardType);
export type Board = RtStatic<typeof BoardType>;
export type Boards = RtStatic<typeof BoardArrayType>;

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
