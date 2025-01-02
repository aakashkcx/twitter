import { relations, sql } from "drizzle-orm";
import {
  AnySQLiteColumn,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

const created = integer({ mode: "timestamp_ms" })
  .notNull()
  .default(sql`(CURRENT_TIMESTAMP)`);

const updated = integer({ mode: "timestamp_ms" })
  .notNull()
  .default(sql`(CURRENT_TIMESTAMP)`)
  .$onUpdate(() => new Date());

export const usersTable = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  hash: text().notNull(),
  created,
  updated,
});

export const tweetsTable = sqliteTable("tweets", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  user: integer()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  body: text().notNull(),
  parent: integer({ mode: "number" }).references(
    (): AnySQLiteColumn => tweetsTable.id,
  ),
  created,
  updated,
});

export const likesTable = sqliteTable(
  "likes",
  {
    user: integer()
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    tweet: integer()
      .notNull()
      .references(() => tweetsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    created,
  },
  (table) => [primaryKey({ columns: [table.user, table.tweet] })],
);

export const userRelations = relations(usersTable, ({ many }) => ({
  tweets: many(tweetsTable),
  likes: many(likesTable),
}));

export const tweetsRelations = relations(tweetsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [tweetsTable.user],
    references: [usersTable.id],
  }),
  parent: one(tweetsTable, {
    fields: [tweetsTable.parent],
    references: [tweetsTable.id],
    relationName: "parent",
  }),
  children: many(tweetsTable, { relationName: "parent" }),
  likes: many(likesTable),
}));

export const likesRelations = relations(likesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [likesTable.user],
    references: [usersTable.id],
  }),
  tweet: one(tweetsTable, {
    fields: [likesTable.tweet],
    references: [tweetsTable.id],
  }),
}));
