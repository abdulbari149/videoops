import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingCompletedAt: true },
  });
  if (!user) {
    redirect("/login");
  }
  if (!user.onboardingCompletedAt) {
    redirect("/onboarding");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
