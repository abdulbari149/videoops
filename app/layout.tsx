import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { DEFAULT_THEME_ID } from "@/lib/theme/config";
import { paletteToCssVars } from "@/lib/theme/css-vars";
import { PALETTES } from "@/lib/theme/palettes";
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

const initialPalette = PALETTES[DEFAULT_THEME_ID];

export const metadata: Metadata = {
  title: "VideoOps",
  description: "Client video uploads, scheduling, and multi-channel publishing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME_ID}
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={paletteToCssVars(initialPalette)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
