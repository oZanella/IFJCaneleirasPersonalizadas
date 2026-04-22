import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (typeof window === 'undefined') {
  if (databaseUrl) {
    console.log(
      `✅ Base de dados configurada (${process.env.DATABASE_URL ? 'DATABASE_URL' : 'POSTGRES_URL'})`,
    );
  } else {
    console.warn(
      '⚠️ Nenhuma variável de banco de dados encontrada (DATABASE_URL ou POSTGRES_URL)',
    );
  }
}

export const sql = (
  databaseUrl
    ? neon(databaseUrl)
    : () => {
        const errorMsg = '❌ Erro: DATABASE_URL não definida no ambiente.';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
) as ReturnType<typeof neon>;
