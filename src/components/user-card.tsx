import { Calendar, Inbox, StickyNote } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserCard({
  user,
  numTweets,
}: {
  user: {
    username: string;
    email: string;
    created: Date;
    updated: Date;
  };
  numTweets: number;
}) {
  return (
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
          {numTweets} Tweets
        </div>
      </CardContent>
    </Card>
  );
}
