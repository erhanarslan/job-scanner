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

export const NOTIFICATION_TYPES = ['new_match', 'digest'] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const SYNC_RUN_STATUSES = ['pending', 'running', 'completed', 'failed'] as const;

export type SyncRunStatus = (typeof SYNC_RUN_STATUSES)[number];

export const ALERT_FREQUENCIES = ['instant', 'daily', 'weekly'] as const;

export type AlertFrequency = (typeof ALERT_FREQUENCIES)[number];
