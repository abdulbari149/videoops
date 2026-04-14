import { OrganizationSize } from "@/generated/prisma/enums";
import { PALETTE_ORDER } from "@/lib/theme/palettes";
import { z } from "zod";

export const organizationSizeSchema = z.enum([
  OrganizationSize.SOLO,
  OrganizationSize.FROM_2_TO_10,
  OrganizationSize.FROM_11_TO_50,
  OrganizationSize.FROM_51_TO_200,
  OrganizationSize.OVER_200,
]);

export const themeIdSchema = z.enum(PALETTE_ORDER);

export type ThemeId = z.infer<typeof themeIdSchema>;

export const workspaceFieldsSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(200),
  organizationSize: organizationSizeSchema,
});

export type WorkspaceFieldsInput = z.infer<typeof workspaceFieldsSchema>;

export function parseWorkspaceFormData(fd: FormData) {
  return workspaceFieldsSchema.safeParse({
    businessName: fd.get("businessName"),
    organizationSize: fd.get("organizationSize"),
  });
}

export const completeOnboardingInputSchema = z.object({
  themeId: themeIdSchema,
  hearAboutUs: z.string().trim().min(1).max(500),
});

export type CompleteOnboardingInput = z.infer<typeof completeOnboardingInputSchema>;
