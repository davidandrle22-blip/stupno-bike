"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getPartnersByTier, partners } from "@/data/partners";

export default function PartneriGrid() {
  const general = getPartnersByTier("general");
  const main = getPartnersByTier("main");
  const partner = getPartnersByTier("partner");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 sm:mb-16"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">
          Podporují nás
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
          Partneři závodu
        </h1>
        <div className="w-16 h-1 rounded-full mt-4" style={{ background: "linear-gradient(90deg, #4A90E2, #1a5adf)" }} />
        <p className="text-white/50 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
          Stupno Bike XCO 2026 by se neobešlo bez výjimečné podpory partnerů. Děkujeme všem, kteří pomáhají přivést UCI C1 mountain bike závod do Plzeňského kraje.
        </p>
      </motion.div>

      {/* Generální partneři */}
      <TierLabel label="Generální partneři" />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {general.map((p, i) => (
          <LogoTile key={p.id} partner={p} size="lg" delay={i * 0.1} />
        ))}
      </div>

      {/* Hlavní partneři */}
      <TierLabel label="Hlavní partneři" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {main.map((p, i) => (
          <LogoTile key={p.id} partner={p} size="md" delay={i * 0.07} />
        ))}
      </div>

      {/* Partneři */}
      <TierLabel label="Partneři" />
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-5">
        {partner.map((p, i) => (
          <LogoTile key={p.id} partner={p} size="sm" delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

function TierLabel({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-4 block">
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
  const heightCls = "min-h-[160px] sm:min-h-[180px]";
  const imgH = size === "lg" ? 110 : size === "md" ? 80 : 56;
  const imgW = size === "lg" ? 260 : size === "md" ? 180 : 130;

  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      title={p.name}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group flex flex-col items-center justify-start gap-0 ${heightCls} bg-white rounded-2xl border-2 border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/15 transition-colors duration-300 px-5 py-5`}
    >
      <Image
        src={p.logo}
        alt={p.name}
        width={imgW}
        height={imgH}
        className="object-contain w-auto group-hover:scale-105 transition-transform duration-300"
        style={{ maxHeight: imgH, maxWidth: "100%" }}
      />
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-center leading-tight mt-1">
        {p.name}
      </span>
      <p className="text-[11px] sm:text-xs text-gray-500 text-center leading-relaxed mt-1 line-clamp-4">
        {p.description}
      </p>
    </motion.a>
  );
}
