import { Calendar } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export function TweetFeed({
  tweets,
}: {
  tweets: {
    id: number;
    user: { username: string };
    body: string;
    created: Date;
    updated: Date;
  }[];
}) {
  return (
    <>
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
    </>
  );
}

export function UserTweetFeed({
  tweets,
  user,
}: {
  tweets: {
    id: number;
    user: number;
    body: string;
    created: Date;
    updated: Date;
  }[];
  user: { username: string };
}) {
  return (
    <>
      {tweets.map((tweet) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="font-semibold">@{user.username}</div>
              <div>{tweet.body}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                {tweet.created.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
