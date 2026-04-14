import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { RegisterInput } from "@/lib/validation/registration";

export async function registerUser({ email, password }: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name: email.split("@")[0] ?? "User",
    },
  });
}
