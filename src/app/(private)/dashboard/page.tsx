import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

import { NewTweetForm } from "@/app/(private)/dashboard/form";
import { db, tweetsTable } from "@/db";
import { getUser } from "@/lib/user";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const tweets = await db.query.tweetsTable.findMany({
    with: { user: { columns: { username: true } } },
    limit: 10,
    orderBy: [desc(tweetsTable.updated)],
  });

  return (
    <>
      <NewTweetForm userId={user.id} />
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            {tweet.user.username}
            <br />
            {tweet.body}
            <br />
            {tweet.created.toString()}
          </li>
        ))}
      </ul>
    </>
  );
}
