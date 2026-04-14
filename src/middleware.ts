import { env } from "@/config/env";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: env.AUTH_SECRET,
  });
  const loggedIn = Boolean(token);

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/onboarding") && !loggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if ((pathname === "/login" || pathname === "/signup") && loggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding/:path*", "/login", "/signup"],
};
