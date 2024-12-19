"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { compareHash } from "@/lib/hash";
import { createSession } from "@/lib/session";

import { loginSchema } from "./schema";

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
