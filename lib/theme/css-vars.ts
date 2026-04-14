import type { CSSProperties } from "react";
import type { PaletteSpec } from "./palettes";

/**
 * Maps a palette to inline CSS custom properties on `<html>` so Tailwind `@theme`
 * and global styles can read `var(--color-*)`.
 */
export function paletteToCssVars(palette: PaletteSpec): CSSProperties {
  const vars: Record<string, string> = {
    "--palette-bg": palette.bg,
    "--palette-surface": palette.surface,
    "--palette-border": palette.border,
    "--palette-text": palette.text,
    "--palette-muted": palette.muted,
    "--palette-accent": palette.accent,
    "--palette-success": palette.success,
    "--palette-warning": palette.warning,
    "--palette-danger": palette.danger,
  };
  if (palette.accentSecondary !== undefined) {
    vars["--palette-accent-secondary"] = palette.accentSecondary;
  }
  return vars as CSSProperties;
}
