import { z } from "zod";

/** Email + non-empty password (sign-in / Credentials provider). */
export const loginCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
