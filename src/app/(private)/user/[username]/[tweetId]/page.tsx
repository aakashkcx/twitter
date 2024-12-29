import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/db";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ username: string; tweetId: string }>;
}) {
  const { username, tweetId: tweetIdString } = await params;

  const tweetId = Number(tweetIdString);
  if (Number.isNaN(tweetId)) return notFound();

  const tweet = await db.query.tweetsTable.findFirst({
    where: (tweet, { eq }) => eq(tweet.id, tweetId),
    with: { user: { columns: { username: true } } },
  });

  if (!tweet || tweet.user.username !== username) return notFound();

  return (
    <div>
      <Link href={`/@${tweet.user.username}`}>{tweet.user.username}</Link>
      <br />
      {tweet.body}
      <br />
      {tweet.created.toLocaleString()}
    </div>
  );
}
