import type { PaletteSlug } from "./palettes";

/**
 * Active theme for the app shell. Change this single export to switch the whole UI
 * until user preference / persistence is wired (see ThemeProvider `setTheme`).
 */
export const DEFAULT_THEME_ID: PaletteSlug = "clean-light";
