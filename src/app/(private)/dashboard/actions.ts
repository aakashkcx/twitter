"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { newTweetSchema } from "@/app/(private)/dashboard/schema";
import { db, tweetsTable } from "@/db";
import { verifySession } from "@/lib/session";

export async function onNewTweetSubmit(values: z.infer<typeof newTweetSchema>) {
  const { success, data } = newTweetSchema.safeParse(values);

  if (!success) return { success: false, error: "Invalid inputs." };

  const userId = await verifySession();

  if (!userId || userId !== data.user) redirect("/login");

  await db.insert(tweetsTable).values({ ...data });

  revalidatePath("/dashboard");

  return { success: true };
}
