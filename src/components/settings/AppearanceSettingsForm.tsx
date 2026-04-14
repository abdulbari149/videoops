"use client";

import { ThemePaletteGrid } from "@/components/onboarding/ThemePaletteGrid";
import { updateThemeSettings } from "@/lib/actions/settings";
import { DEFAULT_THEME_ID } from "@/lib/theme/config";
import { PALETTE_ORDER, type PaletteSlug } from "@/lib/theme/palettes";
import { toastActionResult } from "@/lib/toast-action-result";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  themeId: string | null;
};

export function AppearanceSettingsForm({ themeId }: Props) {
  const router = useRouter();
  const initial: PaletteSlug =
    themeId != null && (PALETTE_ORDER as readonly string[]).includes(themeId)
      ? (themeId as PaletteSlug)
      : DEFAULT_THEME_ID;
  const [selected, setSelected] = useState<PaletteSlug>(initial);
  const [pending, setPending] = useState(false);

  async function onSelect(slug: PaletteSlug) {
    setSelected(slug);
    setPending(true);
    const result = await updateThemeSettings(slug);
    setPending(false);
    if (!toastActionResult(result)) return;
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Choose a color theme for the app. Changes apply after the page refreshes.
      </p>
      <ThemePaletteGrid selected={selected} onSelect={onSelect} />
      {pending ? <p className="text-sm text-muted-foreground">Applying…</p> : null}
    </div>
  );
}
