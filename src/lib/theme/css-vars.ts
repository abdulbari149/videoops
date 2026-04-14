import type { CSSProperties } from "react";
import type { PaletteSpec } from "./palettes";

/**
 * Maps a palette to `--palette-*` on `<html>`. Semantic shadcn tokens (`--color-background`,
 * `--color-primary`, etc.) are defined in `src/app/globals.css` `@theme inline` as
 * references and `color-mix()` derivations from these variables.
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
