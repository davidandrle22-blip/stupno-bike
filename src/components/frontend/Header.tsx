"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import MascotCyclist from "@/components/layout/MascotCyclist";

type Settings = {
  seriesName: string;
  registrationUrl: string | null;
  showUciLogo: boolean;
};

const ZAVOD_LINKS = [
  { label: "Propozice", href: "/zavod/stupno/propozice" },
  { label: "Program", href: "/zavod/stupno/program" },
  { label: "Parkování", href: "/zavod/stupno/parkovani" },
  { label: "Okruhy & mapy", href: "/zavod/stupno/okruhy" },
  { label: "Pořadatel", href: "/zavod/stupno/poradatel" },
  { label: "Partneři závodu", href: "/zavod/stupno/partneri" },
  { label: "Výsledky", href: "/zavod/stupno/vysledky" },
  { label: "Pravidla", href: "/pravidla", dividerBefore: true },
];

const TOP_LINKS = [
  { label: "← Domů", href: "/" },
  { label: "Partneři", href: "/partneri" },
  { label: "O nás", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileZavodOpen, setMobileZavodOpen] = useState(false);
  const [uciReady, setUciReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

            {/* Center: Stupno logo */}
            <div className="flex-1 flex justify-center min-w-0">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/images/logo-obdelnik.png"
                  alt="Stupno Bike — MČR XCO"
                  width={126}
                  height={84}
                  priority
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-lg"
                />
              </Link>
            </div>

            {/* Right: nav + UCI + hamburger */}
            <div className="flex items-center gap-1 lg:gap-2 shrink-0">
              {/* Desktop nav links */}
              <div className="hidden lg:flex items-center gap-0.5">
                {TOP_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link-underline text-white/70 hover:text-white text-[13px] font-medium transition-colors duration-200 px-3 py-2 rounded-lg uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Závod dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 text-white/70 hover:text-white text-[13px] font-medium transition-colors duration-200 px-3 py-2 rounded-lg uppercase tracking-wide"
                  >
                    Závod
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 opacity-60 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-[#0d1a17]/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                      {ZAVOD_LINKS.map((item) => (
                        <div key={item.href}>
                          {item.dividerBefore && (
                            <div className="border-t border-white/10 my-1" />
                          )}
                          <Link
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2.5 text-[13px] text-white/65 hover:text-white hover:bg-white/5 transition-all duration-150"
                          >
                            {item.label}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* UCI logo — all screen sizes, animated */}
              <Image
                src="/images/uci-logo.png"
                alt="UCI"
                width={56}
                height={28}
                className={`w-auto transition-all duration-700 ease-out hover:scale-110 hover:opacity-100 ml-1 lg:ml-2 ${
                  uciReady ? "h-6 opacity-80" : "h-9 opacity-100"
                }`}
              />

              {/* Desktop: Registrace */}
              <a
                href={settings.registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex ml-1 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-bold px-5 py-2 rounded-full text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
              >
                Registrace
              </a>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors lg:hidden"
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
          <div className="p-5 space-y-0">
            {TOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3.5 text-white/80 hover:text-white font-medium uppercase tracking-wide border-b border-white/5 transition-colors min-h-[52px] flex items-center"
              >
                {link.label}
              </Link>
            ))}

            {/* Závod accordion */}
            <div className="border-b border-white/5">
              <button
                onClick={() => setMobileZavodOpen(!mobileZavodOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-white/80 hover:text-white font-medium uppercase tracking-wide transition-colors min-h-[52px]"
              >
                Závod
                <ChevronDown
                  size={16}
                  className={`opacity-50 transition-transform duration-200 ${mobileZavodOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileZavodOpen && (
                <div className="bg-white/[0.02] border-t border-white/5">
                  {ZAVOD_LINKS.map((item) => (
                    <div key={item.href}>
                      {item.dividerBefore && (
                        <div className="border-t border-white/5 mx-4" />
                      )}
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-8 pr-4 py-3 text-white/60 hover:text-white text-sm font-medium transition-colors min-h-[44px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6">
              <a
                href={settings.registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace"}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-accent to-accent-dark text-white font-bold px-6 py-3.5 rounded-full uppercase tracking-wide min-h-[52px] flex items-center justify-center"
              >
                Registrace
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
