import { z } from 'zod';

export const UserSessionInfoType = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
});

export type UserSessionInfo = z.infer<typeof UserSessionInfoType>;

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
