export interface UserSessionInfo {
  id: number,
  name: string,
  username: string,
}

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
