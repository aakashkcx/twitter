import { Calendar } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TweetCard({
  tweet,
}: {
  tweet: {
    user: { username: string };
    body: string;
    created: Date;
    updated: Date;
  };
}) {
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
      <CardFooter className="flex items-center gap-1 text-sm text-muted-foreground">
        <Calendar className="size-4" />
        {tweet.created.toLocaleString()}
      </CardFooter>
    </Card>
  );
}
