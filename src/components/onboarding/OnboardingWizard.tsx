"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OnboardingAppearanceStep } from "@/components/onboarding/OnboardingAppearanceStep";
import { OnboardingBusinessStep } from "@/components/onboarding/OnboardingBusinessStep";
import { OnboardingPersonalStep } from "@/components/onboarding/OnboardingPersonalStep";
import { OrganizationSize } from "@/generated/prisma/enums";
import type { ActionResult } from "@/lib/actions/action-result";
import {
  completeOnboarding,
  saveBusinessStep,
  savePersonalStep,
} from "@/lib/actions/onboarding";
import { toastActionResult } from "@/lib/toast-action-result";
import { DEFAULT_THEME_ID } from "@/lib/theme/config";
import { PALETTE_ORDER, type PaletteSlug } from "@/lib/theme/palettes";
import { useOnboardingThemeStore } from "@/stores/onboarding-theme-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { STEP_LABELS, parseInitialHearAbout, type HearOption } from "./constants";

type Props = {
  userId: string;
  initialStep: number;
  defaults: {
    firstName: string;
    lastName: string;
    phone: string;
    businessName: string;
    hearAboutUs: string;
    organizationSize: string | null;
    themeId: string | null;
  };
};

export function OnboardingWizard({ userId, initialStep, defaults }: Props) {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState(() => Math.min(2, Math.max(0, initialStep)));
  const [pending, setPending] = useState(false);

  const [firstName, setFirstName] = useState(defaults.firstName);
  const [lastName, setLastName] = useState(defaults.lastName);
  const [phone, setPhone] = useState(defaults.phone);
  const [businessName, setBusinessName] = useState(defaults.businessName);

  const initialHear = parseInitialHearAbout(defaults.hearAboutUs);
  const [hearSelected, setHearSelected] = useState<HearOption | null>(initialHear.selected);
  const [hearOtherDetail, setHearOtherDetail] = useState(initialHear.otherDetail);

  const [orgSize, setOrgSize] = useState<string>(
    defaults.organizationSize ?? OrganizationSize.SOLO
  );

  const defaultPalette: PaletteSlug = useMemo(
    () =>
      defaults.themeId != null &&
      (PALETTE_ORDER as readonly string[]).includes(defaults.themeId)
        ? (defaults.themeId as PaletteSlug)
        : DEFAULT_THEME_ID,
    [defaults.themeId]
  );

  const draftTheme = useOnboardingThemeStore((s) => s.draftThemeByUserId[userId]);
  const setDraftTheme = useOnboardingThemeStore((s) => s.setDraftTheme);
  const clearDraftTheme = useOnboardingThemeStore((s) => s.clearDraftTheme);

  const selectedTheme: PaletteSlug = draftTheme ?? defaultPalette;

  const [logoUploading, setLogoUploading] = useState(false);
  const [hearDialogOpen, setHearDialogOpen] = useState(false);

  async function run(action: () => Promise<ActionResult>, next: number) {
    setPending(true);
    const result = await action();
    setPending(false);
    if (!toastActionResult(result)) return;
    setStep(next);
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/onboarding/logo", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Upload failed");
        return;
      }
      router.refresh();
    } catch {
      toast.error("Upload failed.");
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleFinish() {
    if (!hearSelected) return;
    const hearAboutUs =
      hearSelected === "Other"
        ? `Other: ${hearOtherDetail.trim()}`
        : hearSelected;
    setPending(true);
    const result = await completeOnboarding({
      themeId: selectedTheme,
      hearAboutUs,
    });
    setPending(false);
    if (!toastActionResult(result)) return;
    clearDraftTheme(userId);
    setHearDialogOpen(false);
    await update();
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-lg rounded-2xl px-8 py-10 shadow-sm">
      <CardHeader className="space-y-2 p-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}
        </p>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {step === 0 && "About you"}
          {step === 1 && "Your business"}
          {step === 2 && "Choose a look"}
        </CardTitle>
        <CardDescription>
          {step === 0 && "A few details so we can tailor VideoOps to you."}
          {step === 1 && "Tell us about your company."}
          {step === 2 && "Pick a color theme for your workspace. You can change this later."}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8 flex flex-col gap-4 p-0">
        {step === 0 && (
          <OnboardingPersonalStep
            firstName={firstName}
            lastName={lastName}
            pending={pending}
            phone={phone}
            onContinue={() =>
              void run(
                () =>
                  savePersonalStep({
                    firstName,
                    lastName,
                    phone,
                  }),
                1
              )
            }
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onPhoneChange={setPhone}
          />
        )}

        {step === 1 && (
          <OnboardingBusinessStep
            businessName={businessName}
            logoUploading={logoUploading}
            orgSize={orgSize}
            pending={pending}
            onBusinessNameChange={setBusinessName}
            onContinue={() =>
              void run(
                () =>
                  saveBusinessStep({
                    businessName,
                    organizationSize: orgSize,
                  }),
                2
              )
            }
            onLogoChange={handleLogoChange}
            onOrgSizeChange={setOrgSize}
          />
        )}

        {step === 2 && (
          <OnboardingAppearanceStep
            hearDialogOpen={hearDialogOpen}
            hearOtherDetail={hearOtherDetail}
            hearSelected={hearSelected}
            pending={pending}
            selectedTheme={selectedTheme}
            onConfirmFinish={() => void handleFinish()}
            onHearDialogOpenChange={setHearDialogOpen}
            onHearOtherDetailChange={setHearOtherDetail}
            onHearSelectedChange={setHearSelected}
            onThemeSelect={(slug) => setDraftTheme(userId, slug)}
          />
        )}
      </CardContent>
    </Card>
  );
}
