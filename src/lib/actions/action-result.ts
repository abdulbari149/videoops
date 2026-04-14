import type { ZodError } from "zod";

export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

export function actionOk<T = void>(data?: T): ActionResult<T> {
  return data === undefined ? { ok: true } : { ok: true, data };
}

export function actionErr(error: string): ActionResult<never> {
  return { ok: false, error };
}

export function zodIssuesToMessage(issues: ZodError['issues']): string {
  return issues.map((i) => i.message).join(" ");
}

/** Maps caught errors to a user-facing string; avoids surfacing raw Prisma internals. */
export function thrownToActionError(
  error: unknown,
  fallbackMessage = "Something went wrong."
): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: string }).code === "string" &&
    (error as { code: string }).code.startsWith("P")
  ) {
    return fallbackMessage;
  }
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return fallbackMessage;
}
