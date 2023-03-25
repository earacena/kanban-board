import decodeWith from '../util/decode';
import { UserSessionInfoType } from '../features/Auth/types/auth.types';
import type { UserSessionInfo } from '../features/Auth/types/auth.types';

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
    body: JSON.stringify({ name, username, password }),
  });

  const responseJson = await response.json();
  if (responseJson.error) {
    throw new Error(responseJson.error);
  } else {
    const userSessionInfo: UserSessionInfo = decodeWith(UserSessionInfoType)(responseJson.user);
    return userSessionInfo;
  }
};

const fetchUserSession = async () => {
  const response = await fetch(`${backendUrl}/api/users/fetch-user`);
  const responseJson = await response.json();
  if (responseJson.error) {
    throw new Error(responseJson.error);
  } else {
    const userSessionInfo: UserSessionInfo = decodeWith(UserSessionInfoType)(responseJson.user);
    return userSessionInfo;
  }
};

export default {
  create,
  fetchUserSession,
};
