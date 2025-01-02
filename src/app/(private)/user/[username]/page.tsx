import { notFound } from "next/navigation";

import { UserTweetFeed } from "@/app/(private)/_components/tweet-feed";
import { UserCard } from "@/app/(private)/_components/user-card";
import { db } from "@/db";

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
      <UserCard user={user} numTweets={user.tweets.length} />
      <div className="mt-5 flex flex-col gap-3">
        <UserTweetFeed tweets={user.tweets} user={user} />
      </div>
    </>
  );
}
