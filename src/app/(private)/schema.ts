import { z } from "zod";

export const tweetSchema = z.object({
  body: z
    .string()
    .trim()
    .nonempty("Tweet must contain at least 1 character.")
    .max(280, "Tweet cannot be longer than 280 characters."),
  parent: z.number().int().optional(),
});
