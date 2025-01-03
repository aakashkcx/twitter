import { notFound, redirect } from "next/navigation";

import { TweetCard } from "@/app/(private)/_components/tweet-card";
import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
import { db } from "@/db";
import { verifySession } from "@/lib/session";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ tweetId: string }>;
}) {
  const { tweetId: tweetIdString } = await params;

  const userId = await verifySession();
  if (!userId) redirect("/login");

  const tweetId = Number(tweetIdString);
  if (Number.isNaN(tweetId)) return notFound();

  const tweet = await db.query.tweetsTable.findFirst({
    where: (tweet, { eq }) => eq(tweet.id, tweetId),
    with: {
      user: { columns: { username: true } },
      parent: { with: { user: { columns: { username: true } }, likes: true } },
      children: {
        with: { user: { columns: { username: true } }, likes: true },
        orderBy: (tweets, { desc }) => desc(tweets.created),
      },
      likes: true,
    },
  });

  if (!tweet) return notFound();

  return (
    <div className="flex flex-col gap-3">
      {tweet.parent && <TweetFeed tweets={[tweet.parent]} userId={userId} />}
      <TweetCard tweet={tweet} userId={userId} />
      <TweetForm
        parent={tweet.id}
        placeholder={`Reply to @${tweet.user.username}`}
      />
      <TweetFeed tweets={tweet.children} userId={userId} />
    </div>
  );
}
