import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { SOURCE_TYPES, SYNC_RUN_STATUSES } from './schema-constants.ts';

export const sourceTypeEnum = pgEnum('source_type', SOURCE_TYPES);
export const syncRunStatusEnum = pgEnum('source_sync_run_status', SYNC_RUN_STATUSES);

export const sources = pgTable('sources', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  type: sourceTypeEnum('type').notNull(),
  baseUrl: text('base_url').notNull(),
  config: jsonb('config').$type<Record<string, unknown>>().notNull().default({}),
  isActive: boolean('is_active').notNull().default(true),
  syncIntervalMinutes: integer('sync_interval_minutes').notNull().default(60),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const sourceSyncRuns = pgTable('source_sync_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourceId: uuid('source_id')
    .notNull()
    .references(() => sources.id, { onDelete: 'cascade' }),
  status: syncRunStatusEnum('status').notNull().default('pending'),
  startedAt: timestamp('started_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  jobsFetched: integer('jobs_fetched').notNull().default(0),
  jobsCreated: integer('jobs_created').notNull().default(0),
  jobsUpdated: integer('jobs_updated').notNull().default(0),
  jobsDuplicate: integer('jobs_duplicate').notNull().default(0),
  error: text('error'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;

export type SourceSyncRun = typeof sourceSyncRuns.$inferSelect;
export type NewSourceSyncRun = typeof sourceSyncRuns.$inferInsert;
