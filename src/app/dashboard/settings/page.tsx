import { SettingsTabs } from "@/components/settings/SettingsTabs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: { select: { provider: true } },
    },
  });
  if (!user) {
    redirect("/login");
  }

  const providers = new Set(user.accounts.map((a) => a.provider));
  const signInBits: string[] = [];
  if (providers.has("google")) signInBits.push("Google");
  if (user.password) signInBits.push("Email and password");
  const signInLabel = signInBits.length > 0 ? signInBits.join(" · ") : "—";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, workspace, and preferences.
        </p>
      </div>

      <SettingsTabs
        account={{
          email: user.email,
          name: user.name,
          signInLabel,
        }}
        profile={{
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          phone: user.phone ?? "",
        }}
        workspace={{
          businessName: user.businessName ?? "",
          organizationSize: user.organizationSize,
        }}
        themeId={user.themeId}
      />
    </div>
  );
}
