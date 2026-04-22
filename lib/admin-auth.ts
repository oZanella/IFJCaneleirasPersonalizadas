import 'server-only';

import { cookies } from 'next/headers';
import { createHash, timingSafeEqual } from 'node:crypto';

import { sql } from '@/lib/db';

type Admin = {
  email: string;
  password: string;
};

const ADMIN_COOKIE_NAME = 'ifj-admin-session';

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? 'ifj-local-secret';
}

function createSessionToken(email: string, password: string, secret: string) {
  return createHash('sha256')
    .update(`${email}:${password}:${secret}`)
    .digest('hex');
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
  try {
    const admins =
      (await sql`SELECT email, password FROM ifj.admin_users`) as Admin[];

    return admins.some((admin) =>
      safeEqual(token, createSessionToken(admin.email, admin.password, secret)),
    );
  } catch (error) {
    console.error('❌ Error checking admin authentication:', error);
    return false;
  }
}

export async function loginAdmin(email: string, password: string) {
  const admins =
    (await sql`SELECT email, password FROM ifj.admin_users WHERE email = ${email} AND password = ${password}`) as Admin[];
  const matchedUser = admins[0];

  if (!matchedUser) {
    return false;
  }

  const cookieStore = await cookies();
  const token = createSessionToken(
    matchedUser.email,
    matchedUser.password,
    getAdminSecret(),
  );

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
