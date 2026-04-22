import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
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

    // Upload a imagem para o Vercel Blob em vez do sistema local
    const blob = await put(fileName, file, {
      access: 'public',
      addRandomSuffix: true, // Garante que não haverá colisão de nomes
    });

    revalidatePath('/');

    return NextResponse.json({
      imagePath: blob.url,
    });
  } catch (error: any) {
    console.error('❌ Erro no upload para o Vercel Blob:', error);
    return NextResponse.json(
      { error: 'Falha ao enviar imagem para a nuvem.' },
      { status: 500 },
    );
  }
}
