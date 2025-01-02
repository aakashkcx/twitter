import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
import { db } from "@/db";

export default async function DashboardPage() {
  const tweets = await db.query.tweetsTable.findMany({
    with: { user: { columns: { username: true } } },
    limit: 10,
    orderBy: (tweets, { desc }) => desc(tweets.created),
  });

  return (
    <div className="flex flex-col gap-3">
      <TweetForm placeholder="What is happening?" />
      <TweetFeed tweets={tweets} />
    </div>
  );
}
