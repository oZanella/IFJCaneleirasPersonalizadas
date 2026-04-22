import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { isAdminAuthenticated } from "@/lib/admin-auth";

function sanitizeFileName(name: string) {
  const extension = path.extname(name).toLowerCase() || ".png";
  const baseName = path
    .basename(name, extension)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return `${baseName || "produto"}-${Date.now()}${extension}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Selecione uma imagem." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = sanitizeFileName(file.name);
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), buffer);

  revalidatePath("/");

  return NextResponse.json({
    imagePath: `/uploads/${fileName}`,
  });
}
