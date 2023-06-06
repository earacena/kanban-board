import { z } from 'zod';
import { zBoard, zBoards } from '../features/Board';
import { zColumn, zColumns } from '../features/Column/types/column.types';
import {
  zActivities,
  zActivity,
  zCard,
  zCards,
} from '../features/Card/types/card.types';

const ErrorPayload = z.object({
  code: z.union([z.string(), z.null()]),
  path: z.optional(z.union([
    z.string(),
    z.array(z.union([z.string(), z.number()])),
    z.null(),
  ])),
  value: z.optional(z.union([
    z.string(),
    z.number(),
  ])),
  message: z.string(),
});

export const ApiResponse = z.object({
  success: z.boolean(),
});

const ErrorResponsePayload = z.object({
  errorType: z.optional(z.enum(['zod', 'sequelize', 'base'])),
  errors: z.optional(z.array(ErrorPayload)),
});

export const UserDetailsPayload = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
  }),
});

export const SessionPayload = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
  }),
});

export const UserDetailsResponse = ApiResponse.and(z.object({ data: UserDetailsPayload }));
export const BoardResponse = ApiResponse.and(z.object({ data: z.object({ board: zBoard }) }));
export const BoardsResponse = ApiResponse.and(z.object({ data: z.object({ boards: zBoards }) }));
export const ColumnResponse = ApiResponse.and(z.object({ data: z.object({ column: zColumn }) }));
export const ColumnsResponse = ApiResponse.and(z.object({ data: z.object({ columns: zColumns }) }));
export const CardResponse = ApiResponse.and(z.object({ data: z.object({ card: zCard }) }));
export const CardsResponse = ApiResponse.and(z.object({ data: z.object({ cards: zCards }) }));
export const ActivityResponse = ApiResponse.and(
  z.object({ data: z.object({ activity: zActivity }) }),
);
export const ActivitiesResponse = ApiResponse.and(
  z.object({ data: z.object({ activities: zActivities }) }),
);
export const ErrorResponse = ApiResponse.and(ErrorResponsePayload);
export const SessionResponse = ApiResponse.and(z.object({ data: SessionPayload }));
