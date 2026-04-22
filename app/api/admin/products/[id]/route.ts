import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import type { ProductInput, ProductSection } from "@/features/landing/data/landing-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteProduct, updateProduct } from "@/lib/products-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as ProductInput & { section?: ProductSection };

  if (!body.section) {
    return NextResponse.json({ error: "Selecione a seção do produto." }, { status: 400 });
  }

  try {
    const product = await updateProduct(id, body.section, body);
    revalidatePath("/");
    return NextResponse.json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao atualizar produto.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deleteProduct(id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao remover produto.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
