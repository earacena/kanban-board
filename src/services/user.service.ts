import { ErrorResponse, UserDetailsResponse } from './common.types';

interface CreateUserProps {
  name: string,
  username: string,
  password: string,
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const create = async ({ name, username, password }: CreateUserProps) => {
  const response = await fetch(`${backendUrl}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, username, password }),
  });

  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const session = UserDetailsResponse.parse(responseJson).data.user;
    return session;
  }
};

const fetchUserSession = async () => {
  const response = await fetch(
    `${backendUrl}/api/users/fetch-user`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  const responseJson = await response.json();
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const userSessionInfo = UserDetailsResponse.parse(responseJson).data.user;
    return userSessionInfo;
  }
};

const userServices = {
  create,
  fetchUserSession,
};

export default userServices;
