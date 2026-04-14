"use client";

import { PALETTES, PALETTE_ORDER, type PaletteSlug } from "@/lib/theme/palettes";
import { cn } from "@/lib/utils";

type Props = {
  selected: PaletteSlug;
  onSelect: (slug: PaletteSlug) => void;
};

export function ThemePaletteGrid({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {PALETTE_ORDER.map((slug) => {
        const p = PALETTES[slug];
        const isSelected = selected === slug;
        return (
          <button
            key={slug}
            type="button"
            className={cn(
              "flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors",
              isSelected
                ? "border-primary ring-2 ring-primary"
                : "border-border hover:bg-surface"
            )}
            onClick={() => onSelect(slug)}
          >
            <div className="flex gap-1">
              <span
                className="h-6 flex-1 rounded-md border border-black/10"
                style={{ backgroundColor: p.bg }}
              />
              <span
                className="h-6 flex-1 rounded-md border border-black/10"
                style={{ backgroundColor: p.surface }}
              />
              <span
                className="h-6 flex-1 rounded-md border border-black/10"
                style={{ backgroundColor: p.accent }}
              />
            </div>
            <span className="text-sm font-semibold text-foreground">{p.name}</span>
            <span className="text-xs text-muted-foreground">{p.tagline}</span>
          </button>
        );
      })}
    </div>
  );
}
