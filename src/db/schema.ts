import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// https://orm.drizzle.team/docs/column-types/sqlite

const created = integer({ mode: "timestamp" }).default(
  sql`(CURRENT_TIMESTAMP)`
);

const updated = integer({ mode: "timestamp" })
  .default(sql`(CURRENT_TIMESTAMP)`)
  .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`);

export const usersTable = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  email: text().notNull().unique(),
  created: created,
  updated: updated,
});

export const tweetsTable = sqliteTable("tweets", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  user: text().notNull(),
  body: text().notNull(),
  created: created,
  updated: updated,
});
