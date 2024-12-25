"use server";

import { JWTPayload, jwtVerify, SignJWT } from "jose";

const DURATION = process.env.SESSION_DURATION!;
const JWT_ALGORITHM = process.env.SESSION_JWT_ALGORITHM!;
const JWT_SECRET = process.env.SESSION_JWT_SECRET!;

const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(DURATION)
    .sign(encodedKey);
}

export async function decrypt(jwt: string) {
  try {
    const { payload } = await jwtVerify(jwt, encodedKey, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload;
  } catch {
    return;
  }
}
