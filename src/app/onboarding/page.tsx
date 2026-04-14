import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    redirect("/login");
  }
  if (user.onboardingCompletedAt) {
    redirect("/dashboard");
  }

  const step = Math.min(2, Math.max(0, user.onboardingStep));

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-6 py-16 font-sans">
      <OnboardingWizard
        defaults={{
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          phone: user.phone ?? "",
          businessName: user.businessName ?? "",
          hearAboutUs: user.hearAboutUs ?? "",
          organizationSize: user.organizationSize,
          themeId: user.themeId,
        }}
        initialStep={step}
        userId={session.user.id}
      />
    </div>
  );
}
