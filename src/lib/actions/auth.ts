"use server";

import { signOut } from "@/auth";
import {
  actionErr,
  actionOk,
  type ActionResult,
  thrownToActionError,
  zodIssuesToMessage,
} from "@/lib/actions/action-result";
import { registerUser } from "@/lib/services/auth.service";
import { parseRegisterFormData } from "@/lib/validation/registration";

export type RegisterResult = ActionResult;

export async function registerWithCredentials(formData: FormData): Promise<RegisterResult> {
  const parsed = parseRegisterFormData(formData);
  if (!parsed.success) {
    return actionErr(zodIssuesToMessage(parsed.error.issues));
  }

  try {
    await registerUser(parsed.data);
  } catch (e) {
    return actionErr(thrownToActionError(e, "Could not create account."));
  }

  return actionOk();
}

export async function signOutFromApp() {
  await signOut({ redirectTo: "/" });
}
