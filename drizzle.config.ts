import { defineConfig } from "drizzle-kit";

import "dotenv/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
  verbose: true,
  strict: true,
});
