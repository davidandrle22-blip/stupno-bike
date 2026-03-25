"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { partners, getPartnersByTier } from "@/data/partners";

export default function PartnersStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const general = getPartnersByTier("general");
  const main = getPartnersByTier("main");
  const partner = getPartnersByTier("partner");

  return (
    <section className="py-14 sm:py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 sm:mb-12">
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
            Více info
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Generální partneři — velké dlaždice */}
        <div className="mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 mb-3 block">
            Generální partneři
          </span>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {general.map((p, i) => (
              <LogoTile key={p.id} partner={p} size="lg" index={i} visible={visible} />
            ))}
          </div>
        </div>

        {/* Hlavní partneři */}
        <div className="mt-4 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 mb-3 block">
            Hlavní partneři
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {main.map((p, i) => (
              <LogoTile key={p.id} partner={p} size="md" index={i + general.length} visible={visible} />
            ))}
          </div>
        </div>

        {/* Partneři */}
        <div className="mt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 mb-3 block">
            Partneři
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
            {partner.map((p, i) => (
              <LogoTile key={p.id} partner={p} size="sm" index={i + general.length + main.length} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoTile({
  partner: p,
  size,
  index,
  visible,
}: {
  partner: (typeof partners)[0];
  size: "lg" | "md" | "sm";
  index: number;
  visible: boolean;
}) {
  const heightCls = size === "lg" ? "h-24 sm:h-28" : size === "md" ? "h-16 sm:h-20" : "h-14 sm:h-16";
  const imgH = size === "lg" ? 80 : size === "md" ? 56 : 44;
  const imgW = size === "lg" ? 200 : size === "md" ? 140 : 110;

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      title={p.name}
      className={`group flex items-center justify-center ${heightCls} bg-white rounded-xl border-2 border-transparent hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 0.035}s, transform 0.5s ease ${index * 0.035}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <Image
        src={p.logo}
        alt={p.name}
        width={imgW}
        height={imgH}
        className="object-contain w-auto px-3 group-hover:scale-105 transition-transform duration-300"
        style={{ maxHeight: imgH }}
      />
    </a>
  );
}
