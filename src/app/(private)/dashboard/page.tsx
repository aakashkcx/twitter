import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { NewTweetForm } from "@/app/(private)/dashboard/form";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="flex flex-col gap-3 mt-5">
        {tweets.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <Card>
              <CardContent className="flex flex-col p-4">
                <div className="font-semibold">@{tweet.user.username}</div>
                <div>{tweet.body}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {tweet.created.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
