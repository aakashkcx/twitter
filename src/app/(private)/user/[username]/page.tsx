import Link from "next/link";
import { notFound } from "next/navigation";

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
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        <p>{user.created.toLocaleDateString()}</p>
      </div>
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
