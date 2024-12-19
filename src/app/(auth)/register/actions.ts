"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { hashFunc } from "@/lib/hash";

import { registerSchema } from "./schema";

export async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
  const { success, data } = registerSchema.safeParse(values);

  if (!success) return { error: true };

  const hash = await hashFunc(data.password);

  const user = await db
    .insert(usersTable)
    .values({ ...data, hash })
    .returning();

  console.log(user);

  redirect("/");
}
