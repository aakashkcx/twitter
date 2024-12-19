import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";

const FILE_NAME = process.env.DB_FILE_NAME!;

export const db = drizzle({ connection: FILE_NAME, schema });
