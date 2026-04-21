import { z } from 'zod';

import { SOURCE_TYPES, USER_JOB_ACTION_TYPES } from '@job-scanner/config';

export const jobFiltersSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  isRemote: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  sourceType: z
    .string()
    .transform((v) => v.split(','))
    .pipe(z.array(z.enum(SOURCE_TYPES)))
    .optional(),
  tags: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
  salaryMin: z.coerce.number().positive().optional(),
  salaryMax: z.coerce.number().positive().optional(),
  experienceLevel: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
  employmentType: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
  postedAfter: z.string().datetime().optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const userJobActionSchema = z.object({
  actionType: z.enum(USER_JOB_ACTION_TYPES),
});

export type JobFiltersInput = z.infer<typeof jobFiltersSchema>;
export type UserJobActionInput = z.infer<typeof userJobActionSchema>;
