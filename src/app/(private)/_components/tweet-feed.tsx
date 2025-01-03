"use client";

import { Calendar, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { likeTweet, unlikeTweet } from "@/app/(private)/actions";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TweetFeed({
  tweets,
  userId,
}: {
  tweets: {
    id: number;
    user: { username: string };
    body: string;
    parent?: { user: { username: string } } | null;
    created: Date;
    updated: Date;
    likes: { user: number }[];
    children?: { id: number }[];
  }[];
  userId: number;
}) {
  const pathname = usePathname();

  return (
    <>
      {tweets.map((tweet) => {
        const liked = tweet.likes.some((like) => userId === like.user);

        function onLikeClick(event: React.MouseEvent<HTMLButtonElement>) {
          event.preventDefault();
          const action = liked ? unlikeTweet : likeTweet;
          action(tweet.id, pathname);
        }

        return (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <Card>
              <CardContent className="flex flex-col gap-1 p-4">
                <div className="flex gap-2 font-semibold">
                  @{tweet.user.username}
                  {tweet.parent && (
                    <>
                      <span className="font-normal text-muted-foreground">
                        replying to
                      </span>
                      @{tweet.parent.user.username}
                    </>
                  )}
                </div>
                <div>{tweet.body}</div>
                <div className="flex text-sm text-muted-foreground">
                  <div className="flex w-2/5 min-w-max items-center gap-1">
                    <Calendar className="size-4" />
                    {tweet.created.toLocaleString()}
                  </div>
                  <div className="flex w-1/6 min-w-max items-center gap-1">
                    <MessageCircle className="size-4" />
                    {tweet.children?.length}
                  </div>
                  <button
                    className="flex min-w-max items-center gap-1 hover:text-chart-5"
                    onClick={onLikeClick}
                  >
                    <Heart
                      fill={liked ? "currentColor" : "none"}
                      className={cn("size-4", liked && "text-chart-5")}
                    />
                    {tweet.likes.length}
                  </button>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
