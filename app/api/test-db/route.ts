import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await sql`SELECT 1 as connection_test`;
    return NextResponse.json({
      status: 'success',
      message: 'Conectado ao banco de dados com sucesso!',
      data: result,
      env_check: {
        has_url: !!(
          process.env.DATABASE_URL ||
          process.env.IFJ_DATABASE_URL ||
          process.env.POSTGRES_URL ||
          process.env.IFJ_POSTGRES_URL
        ),
        node_env: process.env.NODE_ENV,
        available_keys: Object.keys(process.env).filter(
          (key) =>
            key.includes('POSTGRES') ||
            key.includes('DATABASE') ||
            key.includes('URL') ||
            key.includes('DB'),
        ),
      },
      db_inspect: {
        schema_exists: (
          await sql`SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'ifj')`
        )[0]?.exists,
        tables: await sql`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'ifj'
        `,
      },
    });
  } catch (error: any) {
    console.error('❌ Erro no teste de banco de dados:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Falha na conexão com o banco de dados.',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        env_check: {
          has_url: !!(
            process.env.DATABASE_URL ||
            process.env.IFJ_DATABASE_URL ||
            process.env.POSTGRES_URL ||
            process.env.IFJ_POSTGRES_URL
          ),
          node_env: process.env.NODE_ENV,
          available_keys: Object.keys(process.env).filter(
            (key) =>
              key.includes('POSTGRES') ||
              key.includes('DATABASE') ||
              key.includes('URL') ||
              key.includes('DB'),
          ),
        },
      },
      { status: 500 },
    );
  }
}
