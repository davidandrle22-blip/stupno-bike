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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {general.map((p, i) => (
          <LogoTile key={p.id} partner={p} logoH={100} logoW={260} delay={i * 0.1} />
        ))}
      </div>

      {/* Hlavní partneři */}
      <TierLabel label="Hlavní partneři" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {main.map((p, i) => (
          <LogoTile key={p.id} partner={p} logoH={70} logoW={180} delay={i * 0.07} />
        ))}
      </div>

      {/* Partneři */}
      <TierLabel label="Partneři" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
        {partner.map((p, i) => (
          <LogoTile key={p.id} partner={p} logoH={56} logoW={140} delay={i * 0.05} />
        ))}
      </div>

      {/* Partneři Českého poháru */}
      <div className="mt-14">
        <TierLabel label="Partneři Českého poháru XCO" />
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center">
          <Image
            src="/images/pohar-cp-partneri.png"
            alt="Partneři Českého poháru XCO"
            width={900}
            height={300}
            className="w-full max-w-3xl h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function TierLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px flex-1 bg-white/10" />
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 shrink-0">
        {label}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function LogoTile({
  partner: p,
  logoH,
  logoW,
  delay,
}: {
  partner: (typeof partners)[0];
  logoH: number;
  logoW: number;
  delay: number;
}) {
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
      className="group flex flex-col bg-white rounded-2xl border-2 border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/15 transition-colors duration-300 overflow-hidden"
    >
      {/* Logo zone — fixed height, logo centered */}
      <div
        className="flex items-center justify-center w-full shrink-0 px-6"
        style={{ height: logoH + 40 }}
      >
        <Image
          src={p.logo}
          alt={p.name}
          width={logoW}
          height={logoH}
          className="object-contain w-auto group-hover:scale-105 transition-transform duration-300"
          style={{ maxHeight: logoH, maxWidth: "100%" }}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-5" />

      {/* Text zone */}
      <div className="flex flex-col px-5 py-4 gap-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">
          {p.name}
        </span>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          {p.description}
        </p>
      </div>
    </motion.a>
  );
}
