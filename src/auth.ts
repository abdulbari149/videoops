import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";
import { loginCredentialsSchema } from "@/lib/validation/credentials";

const googleConfigured = Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  pages: { signIn: "/login" },
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginCredentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.password) return null;
        const ok = await compare(password, user.password);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user?.id) {
        token.sub = user.id;
        const row = await prisma.user.findUnique({
          where: { id: user.id },
          select: { onboardingCompletedAt: true },
        });
        token.onboardingComplete = Boolean(row?.onboardingCompletedAt);
      }
      if (trigger === "update" && token.sub) {
        const row = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { onboardingCompletedAt: true },
        });
        token.onboardingComplete = Boolean(row?.onboardingCompletedAt);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.onboardingComplete = Boolean(token.onboardingComplete);
      }
      return session;
    },
  },
});
