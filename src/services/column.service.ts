import { ColumnResponse, ColumnsResponse, ErrorResponse } from './common.types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface CreateProps {
  userId: string,
  boardId: string,
  label: string,
}

interface FetchColumnProps {
  columnId: string,
}

interface FetchColumnsOfBoardProps {
  boardId: string,
}

interface FetchColumnsOfUserProps {
  userId: string,
}

interface UpdateProps {
  columnId: string,
  changes: {
    label: string,
  }
}

interface DeleteColumnProps {
  columnId: string,
}

const create = async ({ userId, boardId, label }: CreateProps) => {
  const response = await fetch(`${backendUrl}/api/columns/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId, boardId, label }),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const newColumn = ColumnResponse.parse(responseJson).data.column;
    return newColumn;
  }
};

const fetchColumnById = async ({ columnId }: FetchColumnProps) => {
  const response = await fetch(`${backendUrl}/api/columns/${columnId}`, {
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
    const fetchedColumn = ColumnResponse.parse(responseJson).data.column;
    return fetchedColumn;
  }
};

const fetchColumnsOfBoard = async ({ boardId }: FetchColumnsOfBoardProps) => {
  const response = await fetch(`${backendUrl}/api/columns/board/${boardId}`, {
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
    const fetchedColumns = ColumnsResponse.parse(responseJson).data.columns;
    return fetchedColumns;
  }
};

const fetchColumnsOfUser = async ({ userId }: FetchColumnsOfUserProps) => {
  const response = await fetch(`${backendUrl}/api/columns/user/${userId}`, {
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
    const fetchedColumns = ColumnsResponse.parse(responseJson).data.columns;
    return fetchedColumns;
  }
};

const update = async ({ columnId, changes }: UpdateProps) => {
  const response = await fetch(`${backendUrl}/api/columns/${columnId}`, {
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
    const updatedColumn = ColumnResponse.parse(responseJson).data.column;
    return updatedColumn;
  }
};

const deleteColumn = async ({ columnId }: DeleteColumnProps) => {
  const response = await fetch(`${backendUrl}/api/columns/${columnId}`, {
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

const columnServices = {
  create,
  fetchColumnById,
  fetchColumnsOfUser,
  fetchColumnsOfBoard,
  update,
  deleteColumn,
};

export default columnServices;
