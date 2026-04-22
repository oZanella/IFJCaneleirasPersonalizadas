import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ DATABASE_URL is missing in production!');
}

export const sql = (
  databaseUrl
    ? neon(databaseUrl)
    : () => {
        console.error(
          '❌ Database query failed: DATABASE_URL is not defined in the environment.',
        );
        throw new Error('DATABASE_URL is not defined.');
      }
) as ReturnType<typeof neon>;
