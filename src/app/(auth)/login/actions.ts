"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { compareHash } from "@/lib/hash";

import { loginSchema } from "./schema";

export async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(values);

  if (!success) return { error: true };

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, data.username),
  });

  if (!user) return { error: true };

  const result = await compareHash(data.password, user.hash);

  if (!result) return { error: true };

  console.log(user);

  redirect("/");
}
