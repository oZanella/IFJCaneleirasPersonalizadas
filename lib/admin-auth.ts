import "server-only";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE_NAME = "ifj-admin-session";

const ADMIN_USERS = [
  {
    email: "ifjcaneleiraspersonalizadas@gmail.com",
    password: "Caneleiras2604IFJ",
  },
  {
    email: "masterzanella@gmail.com",
    password: "master1234!",
  },
] as const;

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "ifj-local-secret";
}

function createSessionToken(email: string, password: string, secret: string) {
  return createHash("sha256").update(`${email}:${password}:${secret}`).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  const secret = getAdminSecret();

  return ADMIN_USERS.some((adminUser) =>
    safeEqual(token, createSessionToken(adminUser.email, adminUser.password, secret)),
  );
}

export async function loginAdmin(email: string, password: string) {
  const matchedUser = ADMIN_USERS.find(
    (adminUser) =>
      safeEqual(email, adminUser.email) && safeEqual(password, adminUser.password),
  );

  if (!matchedUser) {
    return false;
  }

  const cookieStore = await cookies();
  const token = createSessionToken(matchedUser.email, matchedUser.password, getAdminSecret());

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
