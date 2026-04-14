"use server";

import {
  actionErr,
  actionOk,
  type ActionResult,
  thrownToActionError,
  zodIssuesToMessage,
} from "@/lib/actions/action-result";
import { getSessionUserId } from "@/lib/server/get-session-user-id";
import {
  completeOnboarding as completeOnboardingForUser,
  saveOnboardingBusiness as saveOnboardingBusinessForUser,
  saveOnboardingPersonal as saveOnboardingPersonalForUser,
} from "@/lib/services/user.service";
import { onboardingPersonalInputSchema } from "@/lib/validation/user-profile";
import { completeOnboardingInputSchema, workspaceFieldsSchema } from "@/lib/validation/workspace";

export async function savePersonalStep(input: {
  firstName: string;
  lastName: string;
  phone: string;
}): Promise<ActionResult> {
  const userId = await getSessionUserId();
  if (!userId) return actionErr("Unauthorized");

  const parsed = onboardingPersonalInputSchema.safeParse(input);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await saveOnboardingPersonalForUser(userId, parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not save your details."));
  }
  return actionOk();
}

export async function saveBusinessStep(input: {
  businessName: string;
  organizationSize: string;
}): Promise<ActionResult> {
  const userId = await getSessionUserId();
  if (!userId) return actionErr("Unauthorized");

  const parsed = workspaceFieldsSchema.safeParse(input);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await saveOnboardingBusinessForUser(userId, parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not save your business details."));
  }
  return actionOk();
}

export async function completeOnboarding(input: { themeId: string; hearAboutUs: string }): Promise<ActionResult> {
  const userId = await getSessionUserId();
  if (!userId) return actionErr("Unauthorized");

  const parsed = completeOnboardingInputSchema.safeParse(input);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await completeOnboardingForUser(userId, parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not finish onboarding."));
  }
  return actionOk();
}
