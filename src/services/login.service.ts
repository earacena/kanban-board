import { ErrorResponse, UserDetailsResponse } from './common.types';

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
  if (!responseJson.success) {
    const errorResponse = ErrorResponse.parse(responseJson);
    const errorMessages = errorResponse.errors?.map((err) => err.message);
    throw new Error(errorMessages?.join(' '));
  } else {
    const session = UserDetailsResponse.parse(responseJson).data.user;
    return session;
  }
};

const logout = async () => {
  await fetch(`${backendUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

const loginServices = {
  login,
  logout,
};

export default loginServices;
