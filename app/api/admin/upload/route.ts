import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import fs from 'node:fs/promises';
import path from 'node:path';

import { isAdminAuthenticated } from '@/lib/admin-auth';

function sanitizeFileName(name: string) {
  const extension = path.extname(name).toLowerCase() || '.png';
  const baseName = path
    .basename(name, extension)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);

  return `${baseName || 'produto'}-${Date.now()}${extension}`;
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Selecione uma imagem.' },
        { status: 400 },
      );
    }

    const fileName = sanitizeFileName(file.name);

    if (hasBlobToken()) {
      const blob = await put(fileName, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      revalidatePath('/');

      return NextResponse.json({
        imagePath: blob.url,
      });
    }

    // Fallback local quando o token do Blob nao estiver configurado.
    if (process.env.NODE_ENV !== 'production') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const publicDir = path.join(process.cwd(), 'public', 'uploads');

      try {
        await fs.access(publicDir);
      } catch {
        await fs.mkdir(publicDir, { recursive: true });
      }

      const filePath = path.join(publicDir, fileName);
      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        imagePath: `/uploads/${fileName}`,
      });
    }

    return NextResponse.json(
      {
        error:
          'BLOB_READ_WRITE_TOKEN não está configurado no ambiente de produção.',
      },
      { status: 500 },
    );
  } catch (error: unknown) {
    const uploadError =
      error instanceof Error
        ? error
        : new Error('Erro desconhecido durante o upload.');

    console.error('❌ Erro no upload para o Vercel Blob:', error);

    return NextResponse.json(
      {
        error: 'Falha ao enviar imagem para a nuvem.',
        details: uploadError.message,
        debug: {
          has_token: hasBlobToken(),
          available_keys: Object.keys(process.env).filter(
            (k) => k.includes('BLOB') || k.includes('TOKEN'),
          ),
        },
      },
      { status: 500 },
    );
  }
}
