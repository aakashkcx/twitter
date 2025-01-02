import { notFound } from "next/navigation";

import { TweetCard } from "@/components/tweet-card";
import { db } from "@/db";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ tweetId: string }>;
}) {
  const { tweetId: tweetIdString } = await params;

  const tweetId = Number(tweetIdString);
  if (Number.isNaN(tweetId)) return notFound();

  const tweet = await db.query.tweetsTable.findFirst({
    where: (tweet, { eq }) => eq(tweet.id, tweetId),
    with: { user: { columns: { username: true } } },
  });

  if (!tweet) return notFound();

  return <TweetCard tweet={tweet} />;
}
