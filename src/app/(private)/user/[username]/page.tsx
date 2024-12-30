import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { Calendar, Inbox, StickyNote } from "lucide-react";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await db.query.usersTable.findFirst({
    columns: { hash: false },
    where: (user, { eq }) => eq(user.username, username),
    with: {
      tweets: {
        orderBy: (tweets, { desc }) => desc(tweets.created),
      },
    },
  });

  if (!user) return notFound();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>@{user.username}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Inbox className="size-4" />
            {user.email}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            Joined {user.created.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <StickyNote className="size-4" />
            {user.tweets.length} Tweets
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3">
        {user.tweets.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            {username}
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
