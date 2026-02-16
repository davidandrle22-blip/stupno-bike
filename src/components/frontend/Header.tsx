"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Skull } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <div className="flex items-center justify-between h-16">
            {/* Left side: Mascot (mobile) + Logo */}
            <div className="flex items-center gap-2">
              {/* Mascot — all screen sizes */}
              <MascotCyclist size={36} />

              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-black text-sm">XC</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-white font-extrabold text-sm tracking-tight uppercase leading-none block">
                    Mistrovství XC
                  </span>
                  <span className="text-primary-light text-[10px] font-semibold tracking-[0.2em] uppercase leading-none">
                    Horských kol Stupno
                  </span>
                </div>
              </Link>

              {/* Ondra jede Keto */}
              <div className="flex items-center gap-1.5 ml-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                <Skull size={16} className="text-yellow-400" />
                <span className="text-white/90 text-[11px] font-bold tracking-wide whitespace-nowrap">
                  Ondra jede Keto
                </span>
              </div>
            </div>

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
              {settings.registrationUrl && (
                <a
                  href={settings.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-bold px-5 py-2 rounded-lg text-sm uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                >
                  Registrace
                </a>
              )}
            </div>

            {/* Right side: UCI logo (mobile) + hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <Image
                src="/images/uci-logo.png"
                alt="UCI"
                width={40}
                height={20}
                className="h-5 w-auto opacity-80"
              />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
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
