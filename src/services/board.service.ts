import { BoardResponse, BoardsResponse, ErrorResponse } from './common.types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface CreateBoardProps {
  userId: string,
  label: string,
}

interface FetchBoardByIdProps {
  boardId: string,
}

interface FetchBoardByUserIdProps {
  userId: string,
}

interface UpdateBoardByIdProps {
  boardId: string,
  changes: {
    label: string,
  }
}

interface DeleteBoardByIdProps {
  boardId: string,
}

const create = async ({
  userId,
  label,
}: CreateBoardProps) => {
  const response = await fetch(`${backendUrl}/api/boards/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId, label }),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const newBoard = BoardResponse.parse(responseJson).data.board;
    return newBoard;
  }
};

const fetchById = async ({ boardId }: FetchBoardByIdProps) => {
  const response = await fetch(`${backendUrl}/api/boards/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const fetchedBoard = BoardResponse.parse(responseJson).data.board;
    return fetchedBoard;
  }
};

const fetchByUserId = async ({ userId }: FetchBoardByUserIdProps) => {
  const response = await fetch(`${backendUrl}/api/boards/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const fetchedBoards = BoardsResponse.parse(responseJson).data.boards;
    return fetchedBoards;
  }
};

const update = async ({ boardId, changes }: UpdateBoardByIdProps) => {
  const response = await fetch(`${backendUrl}/api/boards/${boardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(changes),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const updatedBoard = BoardResponse.parse(responseJson).data.board;
    return updatedBoard;
  }
};

const deleteBoard = async ({ boardId }: DeleteBoardByIdProps) => {
  const response = await fetch(`${backendUrl}/api/boards/${boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  }
};

const boardServices = {
  create,
  fetchById,
  fetchByUserId,
  update,
  deleteBoard,
};

export default boardServices;
