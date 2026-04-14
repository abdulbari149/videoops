"use client";

import { toast } from "sonner";
import type { ActionResult } from "@/lib/actions/action-result";

/** Toasts on failure and narrows the result when ok. */
export function toastActionResult<T>(result: ActionResult<T>): result is { ok: true; data?: T } {
  if (result.ok) return true;
  toast.error(result.error);
  return false;
}
