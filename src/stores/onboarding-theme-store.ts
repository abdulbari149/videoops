import { PALETTE_ORDER, type PaletteSlug } from "@/lib/theme/palettes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

function isPaletteSlug(v: string): v is PaletteSlug {
  return (PALETTE_ORDER as readonly string[]).includes(v);
}

function sanitizeDraftThemeByUserId(input: unknown): Record<string, PaletteSlug> {
  if (!input || typeof input !== "object") return {};
  const out: Record<string, PaletteSlug> = {};
  for (const [userId, themeId] of Object.entries(input)) {
    if (typeof userId === "string" && typeof themeId === "string" && isPaletteSlug(themeId)) {
      out[userId] = themeId;
    }
  }
  return out;
}

type OnboardingThemeState = {
  draftThemeByUserId: Record<string, PaletteSlug>;
  setDraftTheme: (userId: string, themeId: PaletteSlug) => void;
  clearDraftTheme: (userId: string) => void;
};

export const useOnboardingThemeStore = create<OnboardingThemeState>()(
  persist(
    (set) => ({
      draftThemeByUserId: {},
      setDraftTheme: (userId, themeId) =>
        set((s) => ({
          draftThemeByUserId: { ...s.draftThemeByUserId, [userId]: themeId },
        })),
      clearDraftTheme: (userId) =>
        set((s) => {
          const next = { ...s.draftThemeByUserId };
          delete next[userId];
          return { draftThemeByUserId: next };
        }),
    }),
    {
      name: "videoops:onboarding-theme",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ draftThemeByUserId: state.draftThemeByUserId }),
      merge: (persisted, current) => {
        const p = persisted as Partial<Pick<OnboardingThemeState, "draftThemeByUserId">> | undefined;
        return {
          ...current,
          draftThemeByUserId: sanitizeDraftThemeByUserId(p?.draftThemeByUserId),
        };
      },
    }
  )
);
