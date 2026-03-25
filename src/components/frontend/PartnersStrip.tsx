"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { partners } from "@/data/partners";

export default function PartnersStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">
              Podporují nás
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
              Partneři závodu
            </h2>
          </div>
          <Link
            href="/partneri"
            className="text-sm font-semibold text-white/40 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 shrink-0"
          >
            Všichni partneři
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Logo strip */}
        <div
          ref={stripRef}
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center"
          style={{ scrollbarWidth: "none" }}
        >
          {partners.map((partner, i) => {
            const isGeneral = partner.tier === "general";
            const logoH = isGeneral ? 56 : 40;

            return (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.name}
                className="group shrink-0 flex items-center justify-center px-3 py-2 rounded-xl transition-all duration-400 hover:bg-white/[0.04]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s, background 0.3s ease`,
                }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={isGeneral ? 120 : 90}
                  height={logoH}
                  className="object-contain w-auto transition-all duration-400 grayscale brightness-150 opacity-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105"
                  style={{ maxHeight: logoH }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
