import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';
import { requireDatabaseConfig } from '@job-scanner/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envPath });

async function test() {
  const config = requireDatabaseConfig();

  const client = new Client({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  const result = await client.query('select 1 as ok');
  console.log('DB connection OK:', result.rows[0]);

  await client.end();
}

test().catch((error) => {
  console.error(error);
  process.exit(1);
});
