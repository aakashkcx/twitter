import bcrypt from "bcrypt";

const BCRYPT_COST = parseInt(process.env.BCRYPT_COST!);

export async function hashFunc(plaintext: string) {
  return await bcrypt.hash(plaintext, BCRYPT_COST);
}

export async function compareHash(plaintext: string, hash: string) {
  return await bcrypt.compare(plaintext, hash);
}
