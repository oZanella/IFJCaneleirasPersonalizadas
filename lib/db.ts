import { Pool } from 'pg';

declare global {
  var __ifjPgPool: Pool | undefined;
}

function getPool() {
  if (globalThis.__ifjPgPool) {
    return globalThis.__ifjPgPool;
  }

  const connectionString =
    process.env.IFJ_DATABASE_URL ||
    process.env.DATABASE_URL_FORCE ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.IFJ_POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.IFJ_POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL_NO_SSL;

  if (!connectionString) {
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '❌ [DB] DATABASE_URL is not defined! Available environment variables keys:',
        Object.keys(process.env).filter(
          (k) =>
            k.includes('DB') || k.includes('POSTGRES') || k.includes('URL'),
        ),
      );
      throw new Error(
        'DATABASE_URL is not defined in production! Please check your Vercel environment variables.',
      );
    }
    return null;
  }

  const pool = new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  globalThis.__ifjPgPool = pool;
  return pool;
}

interface SqlFragment {
  strings: TemplateStringsArray;
  values: unknown[];
  __isFragment: true;
}

export async function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  const pool = getPool();
  if (!pool) {
    throw new Error('Database connection string is missing.');
  }

  const { query, params } = buildQuery(strings, values);
  const result = await pool.query(query, params);
  return result.rows;
}

function buildQuery(
  strings: TemplateStringsArray,
  values: unknown[],
  paramIndex = 1,
) {
  let query = strings[0];
  const params: unknown[] = [];

  for (let i = 0; i < values.length; i++) {
    const val = values[i];

    if (val && typeof val === 'object' && '__isFragment' in val) {
      const fragment = val as SqlFragment;
      const { query: fragQuery, params: fragParams } = buildQuery(
        fragment.strings,
        fragment.values,
        paramIndex + params.length,
      );
      query += fragQuery + strings[i + 1];
      params.push(...fragParams);
    } else {
      query += `$${paramIndex + params.length}${strings[i + 1]}`;
      params.push(val);
    }
  }

  return { query, params };
}

const sqlHelper = sql as typeof sql & {
  fragment: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => SqlFragment;
};
sqlHelper.fragment = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return { strings, values, __isFragment: true };
};

export function fragment(
  strings: TemplateStringsArray,
  ...values: unknown[]
): SqlFragment {
  return { strings, values, __isFragment: true };
}
