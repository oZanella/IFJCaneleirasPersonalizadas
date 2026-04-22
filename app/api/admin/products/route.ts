import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import type { ProductInput, ProductSection } from "@/features/landing/data/landing-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createProduct } from "@/lib/products-store";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as ProductInput & { section?: ProductSection };

  if (!body.section) {
    return NextResponse.json({ error: "Selecione a seção do produto." }, { status: 400 });
  }

  try {
    const product = await createProduct(body.section, body);
    revalidatePath("/");
    return NextResponse.json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao criar produto.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
