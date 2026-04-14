"use server";

import {
  actionErr,
  actionOk,
  type ActionResult,
  thrownToActionError,
  zodIssuesToMessage,
} from "@/lib/actions/action-result";
import { revalidateAppTheme } from "@/lib/cache/revalidate-app-theme";
import { getSessionUserId } from "@/lib/server/get-session-user-id";
import { updateUserProfile, updateUserTheme, updateUserWorkspace } from "@/lib/services/user.service";
import { parseSettingsProfileFormData } from "@/lib/validation/user-profile";
import { parseWorkspaceFormData, themeIdSchema } from "@/lib/validation/workspace";

export type SettingsActionResult = ActionResult;

export async function updateProfileSettings(formData: FormData): Promise<SettingsActionResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return actionErr("Unauthorized");
  }

  const parsed = parseSettingsProfileFormData(formData);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await updateUserProfile(userId, parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not save profile."));
  }
  revalidateAppTheme();
  return actionOk();
}

export async function updateWorkspaceSettings(formData: FormData): Promise<SettingsActionResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return actionErr("Unauthorized");
  }

  const parsed = parseWorkspaceFormData(formData);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await updateUserWorkspace(userId, parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not save workspace."));
  }
  revalidateAppTheme();
  return actionOk();
}

export async function updateThemeSettings(themeId: string): Promise<SettingsActionResult> {
  const userId = await getSessionUserId();
  if (!userId) {
    return actionErr("Unauthorized");
  }

  const parsed = themeIdSchema.safeParse(themeId);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await updateUserTheme(userId, parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not update theme."));
  }
  revalidateAppTheme();
  return actionOk();
}
