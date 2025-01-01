"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { cache } from "react";

import { decrypt, encrypt } from "@/lib/jwt";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME!;
const DURATION_SECONDS = parseInt(process.env.SESSION_DURATION_SECONDS!);

const cookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
};

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + DURATION_SECONDS * 1000);
  const jwt = await encrypt({ userId, expires });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, jwt, { ...cookieOptions, expires });
}

export const verifySession = cache(async function () {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(COOKIE_NAME)?.value;
  if (!jwt) return;
  const session = await decrypt(jwt);
  if (!session?.userId) return;
  return Number(session.userId);
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
