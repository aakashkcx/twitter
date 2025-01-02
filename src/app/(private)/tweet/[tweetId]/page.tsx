import { notFound } from "next/navigation";

import { TweetCard } from "@/app/(private)/_components/tweet-card";
import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
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
    with: {
      user: { columns: { username: true } },
      parent: { with: { user: { columns: { username: true } } } },
      children: {
        with: { user: { columns: { username: true } } },
        orderBy: (tweets, { desc }) => desc(tweets.created),
      },
    },
  });

  if (!tweet) return notFound();

  return (
    <div className="flex flex-col gap-3">
      {tweet.parent && <TweetFeed tweets={[tweet.parent]} />}
      <TweetCard tweet={tweet} />
      <TweetForm
        parent={tweet.id}
        placeholder={`Reply to @${tweet.user.username}`}
      />
      <TweetFeed tweets={tweet.children} />
    </div>
  );
}
