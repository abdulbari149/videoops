import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { signOutFromApp } from "@/lib/actions/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 rounded-2xl border border-border bg-card px-8 py-12 shadow-sm">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
        className="theme-logo-invert"
      />
      <div className="flex flex-col gap-4 text-left">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-foreground">
          VideoOps
        </h1>
        <p className="max-w-md text-lg leading-8 text-muted-foreground">
          Theme tokens are wired: background, card, border, foreground, muted, and primary come from the active
          palette (see{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm text-foreground">
            lib/theme/config.ts
          </code>
          ).
        </p>
        {session?.user?.email ? (
          <p className="text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">{session.user.email}</span>
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-3 text-base font-medium sm:flex-row sm:flex-wrap">
        <Link
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-primary-foreground transition-opacity hover:opacity-90"
          href="/palette"
        >
          Compare palettes
        </Link>
        <form action={signOutFromApp}>
          <button
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-background px-6 text-foreground transition-colors hover:bg-surface sm:w-auto"
            type="submit"
          >
            Sign out
          </button>
        </form>
        <a
          className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-foreground transition-colors hover:bg-surface"
          href="https://nextjs.org/docs"
          rel="noopener noreferrer"
          target="_blank"
        >
          Next.js docs
        </a>
      </div>
    </div>
  );
}
