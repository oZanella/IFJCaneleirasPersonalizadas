import { Pool } from 'pg';

declare global {
  var __ifjPgPool: Pool | undefined;
}

function getPool() {
  if (globalThis.__ifjPgPool) {
    return globalThis.__ifjPgPool;
  }

  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    // Only throw if we are not in build time or if we actually need it
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is not defined in production!');
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

/**
 * Tagged template helper to maintain compatibility with existing queries.
 * Converts `sql`SELECT... WHERE id = ${id}`` to `pool.query('SELECT... WHERE id = $1', [id])`
 */
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

// Add a helper for nested fragments (used like sql`fragment`)
const sqlHelper = sql as typeof sql & {
  fragment: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => SqlFragment;
};
sqlHelper.fragment = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return { strings, values, __isFragment: true };
};

// Also export as a function property if needed for better typing
export function fragment(
  strings: TemplateStringsArray,
  ...values: unknown[]
): SqlFragment {
  return { strings, values, __isFragment: true };
}
