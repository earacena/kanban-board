import {
  TypeOf, string, type,
} from 'io-ts';

export const UserSessionInfoType = type({
  id: string,
  name: string,
  username: string,
});

export type UserSessionInfo = TypeOf<typeof UserSessionInfoType>;

export interface AuthState {
  user: UserSessionInfo | undefined,
  isFetching: boolean,
}

export interface SetUserPayload {
  user: UserSessionInfo,
}

export interface SetIsFetchingPayload {
  isFetching: boolean,
}
