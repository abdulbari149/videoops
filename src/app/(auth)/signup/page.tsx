import { env } from "@/config/env";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  const googleConfigured = Boolean(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-6 py-16 font-sans">
      <SignupForm googleConfigured={googleConfigured} />
    </div>
  );
}
