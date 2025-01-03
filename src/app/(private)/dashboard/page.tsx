import { redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
import { db } from "@/db";
import { verifySession } from "@/lib/session";

export default async function DashboardPage() {
  const userId = await verifySession();
  if (!userId) redirect("/login");

  const tweets = await db.query.tweetsTable.findMany({
    with: { user: { columns: { username: true } }, likes: true },
    orderBy: (tweets, { desc }) => desc(tweets.created),
    limit: 10,
  });

  return (
    <div className="flex flex-col gap-3">
      <TweetForm placeholder="What is happening?" />
      <TweetFeed tweets={tweets} userId={userId} />
    </div>
  );
}
