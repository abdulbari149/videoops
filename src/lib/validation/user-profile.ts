import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const profileNameFields = {
  firstName: z.string().trim().min(1, "First name is required").max(120),
  lastName: z.string().trim().min(1, "Last name is required").max(120),
};

/** Onboarding personal step: phone must be present and valid. */
export const onboardingPersonalInputSchema = z.object({
  ...profileNameFields,
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(isValidPhoneNumber, "Invalid phone number"),
});

export type OnboardingPersonalInput = z.infer<typeof onboardingPersonalInputSchema>;

/** Settings profile form: phone required and must be valid when present. */
export const settingsProfileFormSchema = z
  .object({
    ...profileNameFields,
    phone: z
      .string()
      .trim()
      .max(40)
      .refine((v) => v.length === 0 || isValidPhoneNumber(v), "Invalid phone number"),
  })
  .refine((d) => d.phone.length > 0, {
    message: "Phone number is required.",
    path: ["phone"],
  });

export type SettingsProfileInput = z.infer<typeof settingsProfileFormSchema>;

export function parseSettingsProfileFormData(fd: FormData) {
  return settingsProfileFormSchema.safeParse({
    firstName: fd.get("firstName"),
    lastName: fd.get("lastName"),
    phone: fd.get("phone"),
  });
}
