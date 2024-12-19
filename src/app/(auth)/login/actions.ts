"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { loginSchema } from "@/app/(auth)/login/schema";
import { db, usersTable } from "@/db";
import { compareHash } from "@/lib/hash";
import { createSession } from "@/lib/session";

export async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(values);

  if (!success) return { success: false, error: "Invalid inputs." };

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, data.username),
  });

  if (!user) return { success: false, error: "Could not find user." };

  const result = await compareHash(data.password, user.hash);

  if (!result) return { success: false, error: "Incorrect password." };

  await createSession(user.id);

  redirect("/");
}
