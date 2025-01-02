import { redirect } from "next/navigation";

import { NewTweetForm } from "@/app/(private)/dashboard/form";
import { TweetFeed } from "@/components/tweet-feed";
import { db } from "@/db";
import { getUser } from "@/lib/user";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const tweets = await db.query.tweetsTable.findMany({
    with: { user: { columns: { username: true } } },
    limit: 10,
    orderBy: (tweets, { desc }) => desc(tweets.created),
  });

  return (
    <>
      <NewTweetForm userId={user.id} />
      <div className="mt-5 flex flex-col gap-3">
        <TweetFeed tweets={tweets} />
      </div>
    </>
  );
}
