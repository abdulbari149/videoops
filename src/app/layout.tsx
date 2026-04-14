import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist_Mono, Inter } from "next/font/google";
import { auth } from "@/auth";
import { AuthSessionProvider } from "@/components/providers/AuthSessionProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_THEME_ID } from "@/lib/theme/config";
import { prisma } from "@/lib/prisma";
import { paletteToCssVars } from "@/lib/theme/css-vars";
import { PALETTE_ORDER, PALETTES, type PaletteSlug } from "@/lib/theme/palettes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-embed",
});

export const metadata: Metadata = {
  title: "VideoOps",
  description: "Client video uploads, scheduling, and multi-channel publishing",
};

async function resolveHtmlTheme(): Promise<{ id: PaletteSlug; vars: CSSProperties }> {
  const session = await auth();
  let themeId: PaletteSlug = DEFAULT_THEME_ID;
  if (session?.user?.id) {
    const row = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { themeId: true },
    });
    if (
      row?.themeId != null &&
      (PALETTE_ORDER as readonly string[]).includes(row.themeId)
    ) {
      themeId = row.themeId as PaletteSlug;
    }
  }
  const palette = PALETTES[themeId];
  return { id: themeId, vars: paletteToCssVars(palette) };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id: dataTheme, vars } = await resolveHtmlTheme();

  return (
    <html
      lang="en"
      data-theme={dataTheme}
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={vars}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthSessionProvider>
            {children}
            <Toaster />
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
