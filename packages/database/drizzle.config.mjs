import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'drizzle-kit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const host = process.env.SUPABASE_DB_HOST;
const port = process.env.SUPABASE_DB_PORT;
const database = process.env.SUPABASE_DB_NAME;
const user = process.env.SUPABASE_DB_USER;
const password = process.env.SUPABASE_DB_PASSWORD;

if (!host) throw new Error('SUPABASE_DB_HOST is required');
if (!port) throw new Error('SUPABASE_DB_PORT is required');
if (!database) throw new Error('SUPABASE_DB_NAME is required');
if (!user) throw new Error('SUPABASE_DB_USER is required');
if (!password) throw new Error('SUPABASE_DB_PASSWORD is required');

export default defineConfig({
  schema: './src/drizzle-schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host,
    port: Number(port),
    database,
    user,
    password,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
