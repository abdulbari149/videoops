import { env } from "@/config/env";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const googleConfigured = Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-6 py-16 font-sans">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl border border-border bg-card px-8 py-10 text-sm text-muted-foreground shadow-sm">
            Loading…
          </div>
        }
      >
        <LoginForm googleConfigured={googleConfigured} />
      </Suspense>
    </div>
  );
}
