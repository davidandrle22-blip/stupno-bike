import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "MČR XCO Stupno 2026 — Mistrovství ČR horských kol | Velká cena CUBE",
    template: "%s | MČR XCO Stupno 2026",
  },
  description:
    "Mistrovství České republiky horských kol XCO — Stupno — Velká cena CUBE. 17.–19. července 2026, areál Ultramarinka, Břasy. 650 závodníků, 3 dny programu.",
  keywords: [
    "MTB",
    "XCO",
    "MČR",
    "cross-country",
    "závody",
    "horská kola",
    "UCI",
    "Stupno",
    "Mistrovství",
    "Velká cena CUBE",
    "Ultramarinka",
    "Břasy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
