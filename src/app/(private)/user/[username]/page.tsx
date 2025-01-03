import { notFound, redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { UserCard } from "@/app/(private)/_components/user-card";
import { db } from "@/db";
import { verifySession } from "@/lib/session";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const userId = await verifySession();
  if (!userId) redirect("/login");

  const user = await db.query.usersTable.findFirst({
    columns: { hash: false },
    where: (user, { eq }) => eq(user.username, username),
    with: {
      tweets: {
        with: { user: { columns: { username: true } }, likes: true },
        orderBy: (tweets, { desc }) => desc(tweets.created),
      },
    },
  });

  if (!user) return notFound();

  return (
    <div className="flex flex-col gap-3">
      <UserCard user={user} numTweets={user.tweets.length} />
      <TweetFeed tweets={user.tweets} userId={userId} />
    </div>
  );
}
