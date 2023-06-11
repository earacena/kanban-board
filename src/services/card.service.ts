import { ErrorResponse, CardResponse, CardsResponse } from './common.types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface CreateProps {
  userId: string,
  columnId: string,
  brief: string,
  body: string,
}

interface FetchCardProps {
  cardId: string,
}

interface FetchCardsOfColumnProps {
  columnId: string,
}

interface UpdateProps {
  cardId: string,
  changes: {
    columnId: string,
    brief: string,
    body: string,
    color: string,
  }
}

interface DeleteCardProps {
  cardId: string,
}

interface DeleteCardsOfColumnProps {
  columnId: string,
}

const create = async ({
  userId,
  columnId,
  brief,
  body,
}: CreateProps) => {
  const response = await fetch(`${backendUrl}/api/cards/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      userId,
      columnId,
      brief,
      body,
    }),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const newCard = CardResponse.parse(responseJson).data.card;
    return newCard;
  }
};

const fetchCardById = async ({ cardId }: FetchCardProps) => {
  const response = await fetch(`${backendUrl}/api/cards/${cardId}`, {
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
    const fetchedCard = CardResponse.parse(responseJson).data.card;
    return fetchedCard;
  }
};

const fetchCardsByColumnId = async ({ columnId }: FetchCardsOfColumnProps) => {
  const response = await fetch(`${backendUrl}/api/cards/column/${columnId}`, {
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
    const fetchedCards = CardsResponse.parse(responseJson).data.cards;
    return fetchedCards;
  }
};

const update = async ({ cardId, changes }: UpdateProps) => {
  const response = await fetch(`${backendUrl}/api/cards/${cardId}`, {
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
    const updatedCard = CardResponse.parse(responseJson).data.card;
    return updatedCard;
  }
};

const deleteCard = async ({ cardId }: DeleteCardProps) => {
  const response = await fetch(`${backendUrl}/api/cards/${cardId}`, {
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

const deleteCardsByColumnId = async ({ columnId }: DeleteCardsOfColumnProps) => {
  const response = await fetch(`${backendUrl}/api/cards/column/${columnId}`, {
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

const cardServices = {
  create,
  fetchCardById,
  fetchCardsByColumnId,
  update,
  deleteCard,
  deleteCardsByColumnId,
};

export default cardServices;
