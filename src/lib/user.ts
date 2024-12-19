import { eq } from "drizzle-orm";
import { cache } from "react";

import { db, usersTable } from "@/db";
import { verifySession } from "@/lib/session";

export const getUser = cache(async function () {
  const userId = await verifySession();

  if (!userId) return;

  const user = await db.query.usersTable.findFirst({
    columns: { hash: false },
    where: eq(usersTable.id, userId),
  });

  return user;
});
