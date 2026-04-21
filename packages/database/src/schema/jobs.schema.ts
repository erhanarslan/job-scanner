import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { sources } from './sources.schema.ts';

export const jobs = pgTable(
  'jobs',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    sourceId: uuid('source_id')
      .notNull()
      .references(() => sources.id, { onDelete: 'cascade' }),

    externalId: varchar('external_id', { length: 255 }),
    canonicalKey: varchar('canonical_key', { length: 500 }).notNull(),

    title: varchar('title', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }),
    location: varchar('location', { length: 255 }),
    country: varchar('country', { length: 100 }),
    city: varchar('city', { length: 100 }),

    workplaceType: varchar('workplace_type', { length: 50 }),
    employmentType: varchar('employment_type', { length: 50 }),
    seniorityLevel: varchar('seniority_level', { length: 50 }),

    description: text('description'),
    applyUrl: text('apply_url').notNull(),
    sourceUrl: text('source_url'),

    salaryCurrency: varchar('salary_currency', { length: 10 }),
    salaryMin: integer('salary_min'),
    salaryMax: integer('salary_max'),
    salaryInterval: varchar('salary_interval', { length: 20 }),

    tags: jsonb('tags').$type<string[]>().notNull().default([]),
    rawData: jsonb('raw_data').$type<Record<string, unknown>>().notNull().default({}),

    postedAt: timestamp('posted_at', { withTimezone: true }),
    scrapedAt: timestamp('scraped_at', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    canonicalKeyIdx: uniqueIndex('jobs_canonical_key_uidx').on(table.canonicalKey),
    sourceIdIdx: index('jobs_source_id_idx').on(table.sourceId),
    titleIdx: index('jobs_title_idx').on(table.title),
    companyIdx: index('jobs_company_idx').on(table.company),
    postedAtIdx: index('jobs_posted_at_idx').on(table.postedAt),
  }),
);

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
