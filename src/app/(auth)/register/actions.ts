"use server";

import "dotenv/config";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { registerSchema } from "./schema";

const BCRYPT_COST = parseInt(process.env.BCRYPT_COST!);

export async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
  const { success, data } = registerSchema.safeParse(values);

  if (!success) return { error: true };

  const hash = await bcrypt.hash(data.password, BCRYPT_COST);

  const user = await db
    .insert(usersTable)
    .values({ ...data, hash })
    .returning();

  console.log(user);

  redirect("/");
}
