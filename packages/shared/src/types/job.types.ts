export const SOURCE_TYPES = [
  'greenhouse',
  'lever',
  'workable',
  'ashby',
  'remotive',
  'custom',
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

export const USER_JOB_ACTION_TYPES = ['save', 'hide', 'applied'] as const;

export type UserJobActionType = (typeof USER_JOB_ACTION_TYPES)[number];

export const NOTIFICATION_TYPES = ['new_match', 'saved_search_alert', 'system'] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export interface JobListItem {
  id: string;
  externalId: string;
  sourceType: SourceType;
  company: string;
  title: string;
  location: string | null;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  tags: string[];
  postedAt: string | null;
  score: number | null;
  isSaved: boolean;
  isHidden: boolean;
  isApplied: boolean;
}

export interface JobDetail extends JobListItem {
  description: string;
  applyUrl: string;
  employmentType: string | null;
  experienceLevel: string | null;
  rawData: Record<string, unknown>;
  fetchedAt: string;
  updatedAt: string;
}

export interface JobFilters {
  query?: string;
  location?: string;
  isRemote?: boolean;
  sourceType?: SourceType[];
  tags?: string[];
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string[];
  employmentType?: string[];
  postedAfter?: string;
}
