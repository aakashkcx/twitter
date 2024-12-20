import { z } from "zod";

export const newTweetSchema = z.object({
  user: z.number().int(),
  body: z
    .string()
    .trim()
    .max(280, { message: "Tweet cannot be longer than 280 characters." }),
});
