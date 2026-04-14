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
import { registerWithCredentials } from "@/lib/actions/auth";
import { toastActionResult } from "@/lib/toast-action-result";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SignupForm({ googleConfigured }: { googleConfigured: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setPending(true);
    const fd = new FormData();
    fd.set("email", email);
    fd.set("password", password);
    const result = await registerWithCredentials(fd);
    if (!toastActionResult(result)) {
      setPending(false);
      return;
    }
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    setPending(false);
    if (res?.error) {
      toast.error("Account created, but sign-in failed. Try logging in.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md rounded-2xl px-8 py-10 shadow-sm">
      <CardHeader className="space-y-2 p-0">
        <CardTitle className="text-2xl font-semibold tracking-tight">Create account</CardTitle>
        <CardDescription>
          A short password is fine for local dev—use at least 8 characters.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              required
              autoComplete="email"
              className="h-11 text-base md:text-base"
              id="signup-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              required
              autoComplete="new-password"
              className="h-11 text-base md:text-base"
              id="signup-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-confirm">Confirm password</Label>
            <Input
              required
              autoComplete="new-password"
              className="h-11 text-base md:text-base"
              id="signup-confirm"
              name="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <Button className="mt-2 h-11 w-full rounded-full" disabled={pending} type="submit">
            {pending ? "Creating…" : "Create account"}
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
          Already have an account?{" "}
          <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/login">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
