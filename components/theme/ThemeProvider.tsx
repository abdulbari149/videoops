"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { DEFAULT_THEME_ID } from "@/lib/theme/config";
import {
  PALETTES,
  type PaletteSlug,
  type PaletteSpec,
} from "@/lib/theme/palettes";

export type ThemeContextValue = {
  themeId: PaletteSlug;
  palette: PaletteSpec;
  /**
   * Stub: wire to user preference, cookies, or API later; update `document.documentElement`
   * styles with `paletteToCssVars` and sync React state.
   */
  setTheme: (id: PaletteSlug) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** No-op until persistence exists. */
function stubSetTheme(id: PaletteSlug): void {
  console.log("setTheme", id);
}

type Props = { children: ReactNode };

export function ThemeProvider({ children }: Props) {
  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId: DEFAULT_THEME_ID,
      palette: PALETTES[DEFAULT_THEME_ID],
      setTheme: stubSetTheme,
    }),
    []
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
