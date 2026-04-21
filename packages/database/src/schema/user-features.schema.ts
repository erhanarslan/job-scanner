import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  ALERT_FREQUENCIES,
  NOTIFICATION_TYPES,
  USER_JOB_ACTION_TYPES,
} from './schema-constants.ts';
import { jobs } from './jobs.schema.ts';
import { users } from './users.schema.ts';

export const userJobActionTypeEnum = pgEnum('user_job_action_type', USER_JOB_ACTION_TYPES);
export const notificationTypeEnum = pgEnum('notification_type', NOTIFICATION_TYPES);
export const alertFrequencyEnum = pgEnum('alert_frequency', ALERT_FREQUENCIES);

export const savedSearches = pgTable('saved_searches', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  name: varchar('name', { length: 200 }).notNull(),
  filters: jsonb('filters').$type<Record<string, unknown>>().notNull().default({}),
  alertEnabled: boolean('alert_enabled').notNull().default(false),
  alertFrequency: alertFrequencyEnum('alert_frequency').notNull().default('daily'),
  lastAlertSentAt: timestamp('last_alert_sent_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const jobMatches = pgTable(
  'job_matches',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    jobId: uuid('job_id')
      .notNull()
      .references(() => jobs.id, { onDelete: 'cascade' }),

    score: integer('score').notNull(),
    reasons: jsonb('reasons').$type<string[]>().notNull().default([]),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('job_matches_user_idx').on(table.userId),
    jobIdx: index('job_matches_job_idx').on(table.jobId),
  }),
);

export const notifications = pgTable(
  'notifications',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    type: notificationTypeEnum('type').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    body: text('body').notNull(),
    isRead: boolean('is_read').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('notifications_user_idx').on(table.userId),
  }),
);

export const userJobActions = pgTable(
  'user_job_actions',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    jobId: uuid('job_id')
      .notNull()
      .references(() => jobs.id, { onDelete: 'cascade' }),

    actionType: userJobActionTypeEnum('action_type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('user_job_actions_user_idx').on(table.userId),
    jobIdx: index('user_job_actions_job_idx').on(table.jobId),
  }),
);

export type SavedSearch = typeof savedSearches.$inferSelect;
export type NewSavedSearch = typeof savedSearches.$inferInsert;

export type JobMatch = typeof jobMatches.$inferSelect;
export type NewJobMatch = typeof jobMatches.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

export type UserJobAction = typeof userJobActions.$inferSelect;
export type NewUserJobAction = typeof userJobActions.$inferInsert;
