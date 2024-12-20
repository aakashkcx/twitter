import { desc } from "drizzle-orm";

import { NewTweetForm } from "@/app/dashboard/form";
import { db, tweetsTable } from "@/db";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) redirect("/login");

  const tweets = await db.query.tweetsTable.findMany({
    limit: 10,
    orderBy: [desc(tweetsTable.updated)],
  });

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl">Dashboard</h1>
      <NewTweetForm userId={user.id} />
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>{tweet.body}</div>
        ))}
      </div>
    </main>
  );
}
