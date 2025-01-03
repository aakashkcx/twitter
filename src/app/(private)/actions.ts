"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { tweetSchema } from "@/app/(private)/schema";
import { db, likesTable, tweetsTable } from "@/db";
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
    console.error(error);
    return { success: false, error: "There was a problem posting your tweet." };
  }

  revalidatePath(values.parent ? `/tweet/${values.parent}` : "/dashboard");

  return { success: true };
}

export async function likeTweet(
  tweetId: number,
  path: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const userId = await verifySession();
  if (!userId) redirect("/login");

  try {
    await db.insert(likesTable).values({ user: userId, tweet: tweetId });
  } catch (error) {
    console.error(error);
    return { success: false, error: "There was a problem liking the tweet." };
  }

  revalidatePath(path);

  return { success: true };
}

export async function unlikeTweet(
  tweetId: number,
  path: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const userId = await verifySession();
  if (!userId) redirect("/login");

  try {
    await db
      .delete(likesTable)
      .where(and(eq(likesTable.user, userId), eq(likesTable.tweet, tweetId)));
  } catch (error) {
    console.error(error);
    return { success: false, error: "There was a problem liking the tweet." };
  }

  revalidatePath(path);

  return { success: true };
}
