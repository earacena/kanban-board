import decodeWith from '../util/decode';
import { UserSessionInfoType } from '../features/Auth/types/auth.types';
import type { UserSessionInfo } from '../features/Auth/types/auth.types';

interface LoginProps {
  username: string;
  password: string;
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const login = async ({ username, password }: LoginProps) => {
  const response = await fetch(`${backendUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();
  if (responseJson.error) {
    throw new Error(responseJson.error);
  } else {
    const userSessionInfo: UserSessionInfo = decodeWith(UserSessionInfoType)(responseJson);
    return userSessionInfo;
  }
};

const logout = async () => {
  await fetch(`${backendUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

export default {
  login,
  logout,
};
