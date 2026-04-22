import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

// On build time, DATABASE_URL might be missing.
// We only want to throw an error if we actually try to use it.
export const sql = (
  databaseUrl
    ? neon(databaseUrl)
    : () => {
        throw new Error(
          'DATABASE_URL is not defined. Make sure it is set in your environment variables.',
        );
      }
) as ReturnType<typeof neon>;
