import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { requireDatabaseConfig } from '@job-scanner/config';

const config = requireDatabaseConfig();

const pool = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool);

export function getDb() {
  return db;
}

export async function closeDbConnection(): Promise<void> {
  await pool.end();
}
