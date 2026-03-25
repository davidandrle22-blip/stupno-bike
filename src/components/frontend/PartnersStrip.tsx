"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPartnersByTier, partners } from "@/data/partners";

export default function PartnersStrip() {
  const general = getPartnersByTier("general");
  const main = getPartnersByTier("main");
  const partner = getPartnersByTier("partner");

  return (
    <section className="py-14 sm:py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

        {/* Generální partneři */}
        <TierLabel label="Generální partneři" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
          {general.map((p, i) => (
            <LogoTile key={p.id} partner={p} size="lg" delay={i * 0.08} />
          ))}
        </div>

        {/* Hlavní partneři */}
        <TierLabel label="Hlavní partneři" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
          {main.map((p, i) => (
            <LogoTile key={p.id} partner={p} size="md" delay={i * 0.06} />
          ))}
        </div>

        {/* Partneři */}
        <TierLabel label="Partneři" />
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
          {partner.map((p, i) => (
            <LogoTile key={p.id} partner={p} size="sm" delay={i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierLabel({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 mb-3 block">
      {label}
    </span>
  );
}

function LogoTile({
  partner: p,
  size,
  delay,
}: {
  partner: (typeof partners)[0];
  size: "lg" | "md" | "sm";
  delay: number;
}) {
  const heightCls =
    size === "lg" ? "h-24 sm:h-28" : size === "md" ? "h-16 sm:h-20" : "h-14 sm:h-16";
  const imgH = size === "lg" ? 72 : size === "md" ? 48 : 36;
  const imgW = size === "lg" ? 200 : size === "md" ? 150 : 110;

  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      title={p.name}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`group flex flex-col items-center justify-center gap-1.5 ${heightCls} bg-white rounded-xl border-2 border-transparent hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 transition-colors duration-300 px-3`}
    >
      <Image
        src={p.logo}
        alt={p.name}
        width={imgW}
        height={imgH}
        className="object-contain w-auto group-hover:scale-105 transition-transform duration-300"
        style={{ maxHeight: imgH, maxWidth: "100%" }}
      />
    </motion.a>
  );
}
