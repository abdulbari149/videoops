import { prisma } from "@/lib/prisma";
import type { CompleteOnboardingInput, ThemeId, WorkspaceFieldsInput } from "@/lib/validation/workspace";
import type { OnboardingPersonalInput, SettingsProfileInput } from "@/lib/validation/user-profile";

export async function updateUserProfile(userId: string, data: SettingsProfileInput) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    },
  });
}

export async function updateUserWorkspace(userId: string, data: WorkspaceFieldsInput) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      businessName: data.businessName,
      organizationSize: data.organizationSize,
    },
  });
}

export async function updateUserTheme(userId: string, themeId: ThemeId) {
  await prisma.user.update({
    where: { id: userId },
    data: { themeId },
  });
}

export async function saveOnboardingPersonal(userId: string, data: OnboardingPersonalInput) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      onboardingStep: 1,
    },
  });
}

export async function saveOnboardingBusiness(userId: string, data: WorkspaceFieldsInput) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      businessName: data.businessName,
      organizationSize: data.organizationSize,
      onboardingStep: 2,
    },
  });
}

export async function completeOnboarding(userId: string, data: CompleteOnboardingInput) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      themeId: data.themeId,
      hearAboutUs: data.hearAboutUs,
      onboardingCompletedAt: new Date(),
      onboardingStep: 3,
    },
  });
}
