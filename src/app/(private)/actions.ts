"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { tweetSchema } from "@/app/(private)/schema";
import { db, tweetsTable } from "@/db";
import { verifySession } from "@/lib/session";

export async function createTweet(values: z.infer<typeof tweetSchema>) {
  const { success, data } = tweetSchema.safeParse(values);

  if (!success) return { success: false, error: "Invalid inputs." };

  const userId = await verifySession();

  if (!userId) redirect("/login");

  await db.insert(tweetsTable).values({ ...data, user: userId });

  revalidatePath(values.parent ? `/tweet/${values.parent}` : "/dashboard");

  return { success: true };
}
