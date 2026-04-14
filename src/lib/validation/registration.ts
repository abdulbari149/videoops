import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Use at least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export function parseRegisterFormData(fd: FormData) {
  return registerSchema.safeParse({
    email: fd.get("email"),
    password: fd.get("password"),
  });
}
