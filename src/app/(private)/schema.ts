import { z } from "zod";

export const tweetSchema = z.object({
  body: z
    .string()
    .trim()
    .max(280, { message: "Tweet cannot be longer than 280 characters." }),
  parent: z.number().int().optional(),
});
