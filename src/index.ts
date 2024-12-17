import { eq } from "drizzle-orm";

import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";

/* Drizzle testing file */

// type UserInsert = typeof usersTable.$inferInsert;
// type UserSelect = typeof usersTable.$inferSelect;

// type TweetInsert = typeof tweetsTable.$inferInsert;
// type TweetSelect = typeof tweetsTable.$inferSelect;

// type LikeInsert = typeof likesTable.$inferInsert;
// type LikeSelect = typeof likesTable.$inferSelect;

async function main() {
  // Create user
  await db
    .insert(usersTable)
    .values({ username: "aakashkcx", email: "aakashkcx@gmail.com" });
  console.log("New user created!");

  // Read user
  let users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  // Update user
  await db
    .update(usersTable)
    .set({ username: "aakashkc", email: "aakashkc@gmail.com" })
    .where(eq(usersTable.username, "aakashkcx"));
  console.log("User info updated!");

  // Read user
  users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  // Create user
  await db
    .insert(usersTable)
    .values({ username: "aakashkcx", email: "aakashkcx@gmail.com" });
  console.log("New user created!");

  // Read user
  users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  // Create tweet
  await db.insert(tweetsTable).values([
    { user: users[0].id, body: "hello world 1" },
    { user: users[1].id, body: "hello world 2" },
  ]);
  console.log("New tweets created!");

  // Read tweet
  let tweets = await db
    .select()
    .from(tweetsTable)
    .where(eq(tweetsTable.user, users[0].id));
  console.log("Getting all tweets first user: ", tweets);

  // Read tweet
  tweets = await db
    .select()
    .from(tweetsTable)
    .where(eq(tweetsTable.user, users[1].id));
  console.log("Getting all tweets second user: ", tweets);

  // Update tweet
  await db
    .update(tweetsTable)
    .set({ body: "hello world from second user" })
    .where(eq(tweetsTable.user, users[1].id));
  console.log("Tweet info updated!");

  // Read tweet
  tweets = await db.select().from(tweetsTable);
  console.log("Getting all tweets from the database: ", tweets);

  // Create like
  await db.insert(likesTable).values([
    { user: users[0].id, tweet: tweets[0].id },
    { user: users[0].id, tweet: tweets[1].id },
    { user: users[1].id, tweet: tweets[0].id },
  ]);
  console.log("New likes created!");

  // Read like
  let likesTweets = await db
    .select()
    .from(likesTable)
    .leftJoin(tweetsTable, eq(likesTable.tweet, tweetsTable.id))
    .where(eq(likesTable.user, users[0].id));
  console.log("Getting all likes first user: ", likesTweets);

  // Read like
  likesTweets = await db
    .select()
    .from(likesTable)
    .leftJoin(tweetsTable, eq(likesTable.tweet, tweetsTable.id))
    .where(eq(likesTable.user, users[1].id));
  console.log("Getting all likes second user: ", likesTweets);

  // Read like
  let likesUsers = await db
    .select()
    .from(likesTable)
    .leftJoin(usersTable, eq(likesTable.user, usersTable.id))
    .where(eq(likesTable.tweet, tweets[0].id));
  console.log("Getting all likes first tweet: ", likesUsers);

  // Read like
  likesUsers = await db
    .select()
    .from(likesTable)
    .leftJoin(usersTable, eq(likesTable.user, usersTable.id))
    .where(eq(likesTable.tweet, tweets[1].id));
  console.log("Getting all likes second tweet: ", likesUsers);

  // Read like
  let likes = await db.select().from(likesTable);
  console.log("Getting all likes from the database: ", likes);

  // Read user like tweets
  const usersLikedTweets = await db.query.usersTable.findMany({
    with: { likes: { with: { tweet: true } } },
  });
  console.log("Getting all users liked tweets", usersLikedTweets);

  // Read user like tweets
  const userLikedTweets = await db.query.usersTable.findFirst({
    with: { likes: { with: { tweet: true } } },
    where: eq(usersTable.username, "aakashkc"),
  });
  console.log("Getting user aakashkc liked tweets", userLikedTweets);

  // Delete
  await db.delete(usersTable);
  console.log("Users deleted!");

  // Read tweet
  tweets = await db.select().from(tweetsTable);
  console.log("Getting all tweets from the database: ", tweets);

  // Read like
  likes = await db.select().from(likesTable);
  console.log("Getting all likes from the database: ", likes);
}

main();
