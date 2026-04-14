"use client";

import { Button } from "@/components/ui/button";
import { HearAboutUsDialog } from "@/components/onboarding/HearAboutUsDialog";
import { ThemePaletteGrid } from "@/components/onboarding/ThemePaletteGrid";
import type { PaletteSlug } from "@/lib/theme/palettes";
import type { HearOption } from "./constants";

type Props = {
  selectedTheme: PaletteSlug;
  onThemeSelect: (slug: PaletteSlug) => void;
  hearDialogOpen: boolean;
  onHearDialogOpenChange: (open: boolean) => void;
  hearSelected: HearOption | null;
  hearOtherDetail: string;
  onHearSelectedChange: (v: HearOption | null) => void;
  onHearOtherDetailChange: (v: string) => void;
  pending: boolean;
  onConfirmFinish: () => void;
};

export function OnboardingAppearanceStep({
  selectedTheme,
  onThemeSelect,
  hearDialogOpen,
  onHearDialogOpenChange,
  hearSelected,
  hearOtherDetail,
  onHearSelectedChange,
  onHearOtherDetailChange,
  pending,
  onConfirmFinish,
}: Props) {
  return (
    <>
      <ThemePaletteGrid selected={selectedTheme} onSelect={onThemeSelect} />
      <Button
        className="mt-2 h-11 rounded-full"
        disabled={pending}
        type="button"
        onClick={() => onHearDialogOpenChange(true)}
      >
        Finish
      </Button>
      <HearAboutUsDialog
        hearOtherDetail={hearOtherDetail}
        hearSelected={hearSelected}
        open={hearDialogOpen}
        pending={pending}
        onConfirm={onConfirmFinish}
        onHearOtherDetailChange={onHearOtherDetailChange}
        onHearSelectedChange={onHearSelectedChange}
        onOpenChange={onHearDialogOpenChange}
      />
    </>
  );
}
