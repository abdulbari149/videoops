import Link from "next/link";
import type { Metadata } from "next";
import { PALETTE_ORDER, PALETTES } from "@/lib/theme/palettes";

export const metadata: Metadata = {
  title: "Color palettes | VideoOps",
  description: "Compare VideoOps UI color palette options",
};

export default function PaletteIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Choose a palette</h1>
        <p className="mt-2 text-zinc-600">
          Each page shows the same sample dashboard and token swatches so you can compare
          side by side. Open in multiple tabs if you like.
        </p>
        <ul className="mt-10 space-y-3">
          {PALETTE_ORDER.map((slug) => {
            const p = PALETTES[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/palette/${slug}`}
                  className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <span className="font-semibold text-zinc-900">{p.name}</span>
                    <p className="mt-1 text-sm text-zinc-600">{p.tagline}</p>
                  </div>
                  <span className="mt-3 text-sm font-medium text-blue-600 sm:mt-0">
                    View sample →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
