"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import MascotCyclist from "@/components/layout/MascotCyclist";

type Settings = {
  seriesName: string;
  registrationUrl: string | null;
  showUciLogo: boolean;
};

export default function Header({
  settings,
}: {
  settings: Settings;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uciReady, setUciReady] = useState(false);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setUciReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLogoReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: "Novinky", href: "/novinky" },
    { label: "Výsledky", href: "/vysledky" },
    { label: "Partneři", href: "/partneri" },
    { label: "Pravidla", href: "/pravidla" },
    { label: "O nás", href: "/o-nas" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main navigation */}
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/20"
            : "bg-gradient-to-b from-dark/90 to-dark/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Left: Mascot */}
            <div className="flex items-center shrink-0">
              <MascotCyclist size={36} />
            </div>

            {/* Center: Stupno logo — fills space between mascot and nav */}
            <div className="flex-1 flex justify-center min-w-0">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/images/stupno-logo.png"
                  alt="Mistrovství XC Horských kol Stupno"
                  width={280}
                  height={72}
                  priority
                  className={`w-auto transition-all duration-700 ease-out animate-logo-pulse ${
                    logoReady
                      ? "h-12 sm:h-14 lg:h-16"
                      : "h-16 sm:h-20 lg:h-22"
                  }`}
                />
              </Link>
            </div>

            {/* Right: nav + UCI + hamburger */}
            <div className="flex items-center gap-2 lg:gap-3 shrink-0">
              {/* Desktop nav links */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/70 hover:text-white text-[13px] font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/10 uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* UCI logo — all screen sizes, animated */}
              <Image
                src="/images/uci-logo.png"
                alt="UCI"
                width={56}
                height={28}
                className={`w-auto transition-all duration-700 ease-out hover:scale-110 hover:opacity-100 ${
                  uciReady
                    ? "h-6 opacity-80"
                    : "h-9 opacity-100"
                }`}
              />

              {/* Desktop: Registrace */}
              {settings.registrationUrl && (
                <a
                  href={settings.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:inline-flex ml-1 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-bold px-5 py-2 rounded-lg text-sm uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                >
                  Registrace
                </a>
              )}

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-dark/98 backdrop-blur-xl z-40 overflow-y-auto">
          <div className="p-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3.5 text-white/80 hover:text-white font-medium uppercase tracking-wide border-b border-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {settings.registrationUrl && (
              <div className="pt-6">
                <a
                  href={settings.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gradient-to-r from-accent to-accent-dark text-white font-bold px-6 py-3.5 rounded-xl uppercase tracking-wide"
                >
                  Registrace
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
