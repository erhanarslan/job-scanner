import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// packages/config/src/index.ts
// buradan root/.env'e çıkış: ../../../.env
const envPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envPath });

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export function requireDatabaseConfig() {
  return {
    host: getEnv('SUPABASE_DB_HOST'),
    port: Number(getEnv('SUPABASE_DB_PORT')),
    database: getEnv('SUPABASE_DB_NAME'),
    user: getEnv('SUPABASE_DB_USER'),
    password: getEnv('SUPABASE_DB_PASSWORD'),
  };
}

export function requireJwtAccessSecret() {
  return getEnv('JWT_ACCESS_SECRET');
}

export function requireJwtRefreshSecret() {
  return getEnv('JWT_REFRESH_SECRET');
}
