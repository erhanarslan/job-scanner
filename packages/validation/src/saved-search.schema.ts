import { z } from 'zod';

import { SOURCE_TYPES } from '@job-scanner/config';

export const savedSearchSchema = z.object({
  name: z.string().min(1).max(200),
  filters: z.object({
    query: z.string().optional(),
    location: z.string().optional(),
    isRemote: z.boolean().optional(),
    sourceType: z.array(z.enum(SOURCE_TYPES)).optional(),
    tags: z.array(z.string()).optional(),
    salaryMin: z.number().positive().optional(),
    salaryMax: z.number().positive().optional(),
    experienceLevel: z.array(z.string()).optional(),
    employmentType: z.array(z.string()).optional(),
  }),
  alertEnabled: z.boolean().default(false),
  alertFrequency: z.enum(['instant', 'daily', 'weekly']).default('daily'),
});

export type SavedSearchInput = z.infer<typeof savedSearchSchema>;
