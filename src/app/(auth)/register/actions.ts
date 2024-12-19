"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { registerSchema } from "@/app/(auth)/register/schema";
import { db, usersTable } from "@/db";
import { hashFunc } from "@/lib/hash";
import { createSession } from "@/lib/session";

export async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
  const { success, data } = registerSchema.safeParse(values);

  if (!success) return { success: false, error: "Invalid inputs." };

  const hash = await hashFunc(data.password);

  const user = await db
    .insert(usersTable)
    .values({ ...data, hash })
    .returning();

  await createSession(user[0].id);

  redirect("/");
}
