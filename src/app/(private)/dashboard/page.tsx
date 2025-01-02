import { redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
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
      <TweetForm />
      <div className="mt-5 flex flex-col gap-3">
        <TweetFeed tweets={tweets} />
      </div>
    </>
  );
}
