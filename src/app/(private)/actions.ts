"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { tweetSchema } from "@/app/(private)/schema";
import { db, tweetsTable } from "@/db";
import { verifySession } from "@/lib/session";

export async function createTweet(
  values: z.infer<typeof tweetSchema>,
): Promise<{ success: true } | { success: false; error: string }> {
  const userId = await verifySession();
  if (!userId) redirect("/login");

  const { success, data } = tweetSchema.safeParse(values);
  if (!success) return { success: false, error: "Invalid inputs." };

  try {
  await db.insert(tweetsTable).values({ ...data, user: userId });
  } catch (error) {
    console.log(error);
    return { success: false, error: "There was a problem posting your tweet." };
  }

  revalidatePath(values.parent ? `/tweet/${values.parent}` : "/dashboard");

  return { success: true };
}
