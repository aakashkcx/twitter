import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters." }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().trim().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters." }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });
