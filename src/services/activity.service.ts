import { ActivitiesResponse, ActivityResponse, ErrorResponse } from './common.types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface CreateProps {
  cardId: string,
  userId: string,
  type: string,
  description: string,
}

interface FetchActivityByCardIdProps {
  cardId: string,
}

const create = async ({
  cardId, userId, type, description,
}: CreateProps) => {
  const response = await fetch(`${backendUrl}/api/activities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      cardId, userId, type, description,
    }),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const newActivity = ActivityResponse.parse(responseJson).data.activity;
    return newActivity;
  }
};

const FetchActivityByCardId = async ({ cardId }: FetchActivityByCardIdProps) => {
  const response = await fetch(`${backendUrl}/api/activities/card/${cardId}`, {
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
    const fetchedActivities = ActivitiesResponse.parse(responseJson).data.activities;
    return fetchedActivities;
  }
};

const activityServices = {
  create,
  FetchActivityByCardId,
};

export default activityServices;
