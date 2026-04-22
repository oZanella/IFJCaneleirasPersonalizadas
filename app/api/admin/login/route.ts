import { NextResponse } from "next/server";

import { loginAdmin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password?.trim() ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
  }

  const authenticated = await loginAdmin(email, password);

  if (!authenticated) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
