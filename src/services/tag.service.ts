import { ErrorResponse, TagResponse, TagsResponse } from './common.types';

interface CreateProps {
  userId: string,
  cardId: string,
  label: string,
  color: string,
}

interface FetchUserTagsProps {
  userId: string,
}

interface DeleteTagProps {
  tagId: string,
}

interface AddCardIdToTagProps {
  tagId: string,
  cardId: string,
}

interface RemoveCardIdFromTagProps {
  tagId: string,
  cardId: string,
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const create = async ({
  userId,
  cardId,
  label,
  color,
}: CreateProps) => {
  const response = await fetch(`${backendUrl}/api/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      cardId,
      userId,
      label,
      color,
    }),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const newTag = TagResponse.parse(responseJson).data.tag;
    return newTag;
  }
};

const fetchUserTags = async ({ userId }: FetchUserTagsProps) => {
  const response = await fetch(`${backendUrl}/api/tags/user/${userId}`, {
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
    const fetchedTags = TagsResponse.parse(responseJson).data.tags;
    return fetchedTags;
  }
};

const deleteTag = async ({ tagId }: DeleteTagProps) => {
  const response = await fetch(`${backendUrl}/api/tags/${tagId}`, {
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

const addCardIdToTag = async ({ tagId, cardId }: AddCardIdToTagProps) => {
  const response = await fetch(`${backendUrl}/api/tags/${tagId}/card`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cardId,
    }),
    credentials: 'include',
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const updatedTag = TagResponse.parse(responseJson).data.tag;
    return updatedTag;
  }
};

const removeCardIdFromTag = async ({ tagId, cardId }: RemoveCardIdFromTagProps) => {
  const response = await fetch(`${backendUrl}/api/tags/${tagId}/card`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cardId,
    }),
    credentials: 'include',
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const updatedTag = TagResponse.parse(responseJson).data.tag;
    return updatedTag;
  }
};

const tagServices = {
  create,
  fetchUserTags,
  deleteTag,
  addCardIdToTag,
  removeCardIdFromTag,
};

export default tagServices;
