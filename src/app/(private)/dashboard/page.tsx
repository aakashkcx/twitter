import Link from "next/link";
import { redirect } from "next/navigation";

import { NewTweetForm } from "@/app/(private)/dashboard/form";
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
      <div className="flex flex-col gap-3">
        {tweets.map((tweet) => (
          <Link key={tweet.id} href={`/@${tweet.user.username}/${tweet.id}`}>
            {tweet.user.username}
            <br />
            {tweet.body}
            <br />
            {tweet.created.toLocaleString()}
          </Link>
        ))}
      </div>
    </>
  );
}
