import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaletteDemo } from "@/components/palette/PaletteDemo";
import {
  PALETTE_ORDER,
  PALETTES,
  type PaletteSlug,
} from "@/lib/theme/palettes";

type Props = { params: Promise<{ slug: string }> };

function isPaletteSlug(s: string): s is PaletteSlug {
  return (PALETTE_ORDER as readonly string[]).includes(s);
}

export function generateStaticParams() {
  return PALETTE_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPaletteSlug(slug)) {
    return { title: "Palette | VideoOps" };
  }
  const p = PALETTES[slug];
  return {
    title: `${p.name} palette | VideoOps`,
    description: p.tagline,
  };
}

export default async function PaletteSamplePage({ params }: Props) {
  const { slug } = await params;
  if (!isPaletteSlug(slug)) {
    notFound();
  }
  return <PaletteDemo palette={PALETTES[slug]} />;
}
