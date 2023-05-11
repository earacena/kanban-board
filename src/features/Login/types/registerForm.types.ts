/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

export const ErrorType = z.object({
  name: z.string(),
  message: z.string(),
  stack: z.union([z.string(), z.undefined()]),
});
