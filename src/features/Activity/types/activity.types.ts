import { z } from 'zod';

export const zActivity = z.object({
  id: z.string().uuid(),
  cardId: z.string().uuid(),
  userId: z.string().uuid(),
  description: z.string(),
  type: z.string(),
  dateCreated: z.coerce.date(),
});

export const zActivities = z.array(zActivity);

export type ActivityType = z.infer<typeof zActivity>;
export type ActivityArrayType = z.infer<typeof zActivities>;

export interface SetActivitiesPayload {
  activities: ActivityArrayType,
}

export interface AddActivitiesPayload {
  activity: ActivityType,
}
