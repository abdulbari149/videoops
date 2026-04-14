import Link from "next/link";
import type { PaletteSpec, PaletteSlug } from "@/lib/theme/palettes";
import { getAdjacentSlugs } from "@/lib/theme/palettes";

type Props = {
  palette: PaletteSpec;
};

function Swatch({
  label,
  hex,
  fg,
}: {
  label: string;
  hex: string;
  fg: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <div
        className="h-10 w-full rounded-md border shadow-sm"
        style={{ backgroundColor: hex, borderColor: "rgba(0,0,0,0.08)" }}
      />
      <span className="text-[11px] font-medium truncate" style={{ color: fg }}>
        {label}
      </span>
      <span
        className="text-[10px] font-mono opacity-80 truncate"
        style={{ color: fg }}
      >
        {hex}
      </span>
    </div>
  );
}

export function PaletteDemo({ palette }: Props) {
  const { prev, next } = getAdjacentSlugs(palette.slug as PaletteSlug);
  const p = palette;
  const secondary = p.accentSecondary ?? p.accent;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: p.bg, color: p.text }}
    >
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/palette"
              className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
              style={{ color: p.muted }}
            >
              ← All palettes
            </Link>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {p.name}
            </h1>
            <p className="mt-1 text-base" style={{ color: p.muted }}>
              {p.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: p.muted }}>
              <span className="font-medium" style={{ color: p.text }}>
                Best for:{" "}
              </span>
              {p.bestFor}
            </p>
          </div>
          <nav
            className="flex shrink-0 flex-wrap gap-2 sm:justify-end"
            aria-label="Palette navigation"
          >
            {prev ? (
              <Link
                href={`/palette/${prev}`}
                className="rounded-lg border px-3 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  borderColor: p.border,
                  backgroundColor: p.surface,
                  color: p.text,
                }}
              >
                ← Previous
              </Link>
            ) : null}
            {next ? (
              <Link
                href={`/palette/${next}`}
                className="rounded-lg border px-3 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  borderColor: p.border,
                  backgroundColor: p.surface,
                  color: p.text,
                }}
              >
                Next →
              </Link>
            ) : null}
          </nav>
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: p.muted }}>
            Tokens
          </h2>
          <div
            className="grid grid-cols-2 gap-3 rounded-xl border p-4 sm:grid-cols-4 lg:grid-cols-6"
            style={{ backgroundColor: p.surface, borderColor: p.border }}
          >
            <Swatch label="Background" hex={p.bg} fg={p.text} />
            <Swatch label="Surface" hex={p.surface} fg={p.text} />
            <Swatch label="Border" hex={p.border} fg={p.text} />
            <Swatch label="Accent" hex={p.accent} fg={p.text} />
            {p.accentSecondary ? (
              <Swatch label="Accent 2" hex={p.accentSecondary} fg={p.text} />
            ) : null}
            <Swatch label="Success" hex={p.success} fg={p.text} />
            <Swatch label="Warning" hex={p.warning} fg={p.text} />
            <Swatch label="Danger" hex={p.danger} fg={p.text} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: p.muted }}>
            Sample UI
          </h2>
          <div
            className="overflow-hidden rounded-xl border shadow-sm"
            style={{ backgroundColor: p.surface, borderColor: p.border }}
          >
            {/* App chrome */}
            <div
              className="flex items-center justify-between gap-4 border-b px-4 py-3"
              style={{ borderColor: p.border }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-8 w-8 shrink-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${secondary})` }}
                  aria-hidden
                />
                <span className="font-semibold truncate">VideoOps</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span
                  className="rounded-md border px-2.5 py-1 text-xs"
                  style={{ borderColor: p.border, color: p.muted }}
                >
                  Search…
                </span>
                <button
                  type="button"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-white"
                  style={{ backgroundColor: p.accent }}
                >
                  New video
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <aside
                className="border-b md:w-44 md:border-b-0 md:border-r md:py-4"
                style={{ borderColor: p.border }}
              >
                {["Dashboard", "Videos", "Clients", "Schedule"].map((item, i) => (
                  <div
                    key={item}
                    className="px-4 py-2 text-sm"
                    style={{
                      color: i === 1 ? p.text : p.muted,
                      backgroundColor: i === 1 ? `${p.accent}18` : "transparent",
                      borderLeft: i === 1 ? `3px solid ${p.accent}` : "3px solid transparent",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </aside>

              {/* Main */}
              <main className="flex-1 p-4 sm:p-6">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">Videos</h3>
                    <p className="text-sm" style={{ color: p.muted }}>
                      Client uploads & publish queue
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-1.5 text-sm font-medium"
                      style={{ borderColor: p.border, color: p.text }}
                    >
                      Filter
                    </button>
                    <button
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-white"
                      style={{ backgroundColor: p.accent }}
                    >
                      Schedule
                    </button>
                  </div>
                </div>

                <div
                  className="rounded-lg border"
                  style={{ borderColor: p.border, backgroundColor: p.bg }}
                >
                  <div
                    className="grid grid-cols-[auto_1fr_auto] gap-3 border-b px-3 py-2 text-xs font-medium uppercase tracking-wide sm:px-4"
                    style={{ borderColor: p.border, color: p.muted }}
                  >
                    <span className="hidden sm:block">Thumb</span>
                    <span>Title</span>
                    <span className="text-right">Status</span>
                  </div>
                  {[
                    {
                      title: "Q2 product walkthrough",
                      client: "Acme Co",
                      status: "Scheduled",
                      tone: "success" as const,
                    },
                    {
                      title: "Instagram Reel — teaser",
                      client: "North Studio",
                      status: "Needs review",
                      tone: "warning" as const,
                    },
                    {
                      title: "YouTube long-form draft",
                      client: "Acme Co",
                      status: "Failed",
                      tone: "danger" as const,
                    },
                  ].map((row) => {
                    const statusColor =
                      row.tone === "success"
                        ? p.success
                        : row.tone === "warning"
                          ? p.warning
                          : p.danger;
                    return (
                      <div
                        key={row.title}
                        className="grid grid-cols-1 items-center gap-2 border-b px-3 py-3 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:gap-3 sm:px-4"
                        style={{ borderColor: p.border }}
                      >
                        <div
                          className="hidden h-12 w-20 shrink-0 rounded-md sm:block"
                          style={{
                            backgroundColor: p.border,
                            opacity: 0.6,
                          }}
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{row.title}</div>
                          <div className="text-sm truncate" style={{ color: p.muted }}>
                            {row.client}
                          </div>
                        </div>
                        <div className="flex justify-end sm:justify-end">
                          <span
                            className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: `${statusColor}22`,
                              color: statusColor,
                            }}
                          >
                            {row.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs" style={{ color: p.muted }}>
                  Sample only — buttons and layout illustrate contrast and hierarchy with this palette.
                </p>
              </main>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
