"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function LoginForm({ googleConfigured }: { googleConfigured: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!oauthError) return;
    const message =
      oauthError === "OAuthAccountNotLinked"
        ? "This email is already used with another sign-in method."
        : "Something went wrong while signing in.";
    toast.error(message, { id: `oauth-login-${oauthError}` });
  }, [oauthError]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    setPending(false);
    if (res?.error) {
      toast.error("Invalid email or password.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md rounded-2xl px-8 py-10 shadow-sm">
      <CardHeader className="space-y-2 p-0">
        <CardTitle className="text-2xl font-semibold tracking-tight">Log in</CardTitle>
        <CardDescription>Use your email and password to continue.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              required
              autoComplete="email"
              className="h-11 text-base md:text-base"
              id="login-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              required
              autoComplete="current-password"
              className="h-11 text-base md:text-base"
              id="login-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="mt-2 h-11 w-full rounded-full" disabled={pending} type="submit">
            {pending ? "Signing in…" : "Continue"}
          </Button>
        </form>

        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            or
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="h-11 w-full rounded-full"
            disabled={!googleConfigured || pending}
            title={
              googleConfigured
                ? "Continue with Google"
                : "Set AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET to enable Google sign-in."
            }
            type="button"
            variant="outline"
            onClick={() => {
              if (!googleConfigured) return;
              void signIn("google", { callbackUrl: "/" });
            }}
          >
            Continue with Google
          </Button>
          {!googleConfigured && (
            <p className="text-center text-xs text-muted-foreground">
              Google sign-in is disabled until OAuth credentials are configured in your environment.
            </p>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/signup">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
