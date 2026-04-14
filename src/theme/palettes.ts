export type PaletteSpec = {
  slug: string;
  name: string;
  tagline: string;
  /** Short note on when this works well */
  bestFor: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentSecondary?: string;
  success: string;
  warning: string;
  danger: string;
};

export const PALETTE_ORDER = [
  "studio-dark",
  "clean-light",
  "broadcast-teal",
  "warm-coral",
] as const;

export type PaletteSlug = (typeof PALETTE_ORDER)[number];

export const PALETTES: Record<PaletteSlug, PaletteSpec> = {
  "studio-dark": {
    slug: "studio-dark",
    name: "Studio Dark",
    tagline: "Editorial, video-native tooling",
    bestFor: "Dashboard-heavy workflows; calm production-tool feel",
    bg: "#0B0F14",
    surface: "#121826",
    border: "#243045",
    text: "#E7ECF3",
    muted: "#9AA7BD",
    accent: "#6EA8FF",
    accentSecondary: "#A78BFA",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#FB7185",
  },
  "clean-light": {
    slug: "clean-light",
    name: "Clean Light SaaS",
    tagline: "Readable tables and forms, minimal chrome",
    bestFor: "Fast MVP shipping; maximum clarity on data-heavy screens",
    bg: "#F6F7FB",
    surface: "#FFFFFF",
    border: "#E6E8EF",
    text: "#111827",
    muted: "#6B7280",
    accent: "#2563EB",
    accentSecondary: "#1D4ED8",
    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",
  },
  "broadcast-teal": {
    slug: "broadcast-teal",
    name: "Broadcast Teal + Ink",
    tagline: "Distinctive without looking playful",
    bestFor: "Standing out from generic blue SaaS while staying trustworthy",
    bg: "#0E1117",
    surface: "#151A22",
    border: "#2A3344",
    text: "#F3F4F6",
    muted: "#9CA3AF",
    accent: "#2DD4BF",
    accentSecondary: "#14B8A6",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#F43F5E",
  },
  "warm-coral": {
    slug: "warm-coral",
    name: "Warm Neutral + Coral",
    tagline: "Slightly human, agency-friendly",
    bestFor: "Small agencies and teams that want approachability",
    bg: "#FAFAF7",
    surface: "#FFFFFF",
    border: "#E8E6E1",
    text: "#1F2937",
    muted: "#6B7280",
    accent: "#FF5A5F",
    accentSecondary: "#2563EB",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
  },
};

export function getAdjacentSlugs(
  slug: PaletteSlug
): { prev: PaletteSlug | null; next: PaletteSlug | null } {
  const i = PALETTE_ORDER.indexOf(slug);
  return {
    prev: i > 0 ? PALETTE_ORDER[i - 1]! : null,
    next: i < PALETTE_ORDER.length - 1 ? PALETTE_ORDER[i + 1]! : null,
  };
}
