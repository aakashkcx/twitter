import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ tweetId: string }>;
}) {
  const { tweetId: tweetIdString } = await params;

  const tweetId = Number(tweetIdString);
  if (Number.isNaN(tweetId)) return notFound();

  const tweet = await db.query.tweetsTable.findFirst({
    where: (tweet, { eq }) => eq(tweet.id, tweetId),
    with: { user: { columns: { username: true } } },
  });

  if (!tweet) return notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/@${tweet.user.username}`} className="hover:underline">
            @{tweet.user.username}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>{tweet.body}</CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        {tweet.created.toLocaleString()}
      </CardFooter>
    </Card>
  );
}
