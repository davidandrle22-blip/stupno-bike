import Image from "next/image";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import type { Metadata } from "next";
import { getPartnersByTier, partners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partneři | Stupno Bike XCO – UCI C1 MTB závod",
  description: "Partneři závodu Stupno Bike XCO – UCI C1 cross-country horských kol. CUBE, Plzeňský kraj, Raben, Primalex a další.",
};

export default function PartneriPage() {
  const general = getPartnersByTier("general");
  const main = getPartnersByTier("main");
  const partner = getPartnersByTier("partner");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Page header */}
      <AnimatedSection>
        <div className="mb-12 sm:mb-16">
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
        </div>
      </AnimatedSection>

      {/* Generální partneři */}
      <AnimatedSection>
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-4 block">
          Generální partneři
        </span>
      </AnimatedSection>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
        {general.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.1}>
            <LogoTile partner={p} size="lg" />
          </AnimatedSection>
        ))}
      </div>

      {/* Hlavní partneři */}
      <AnimatedSection>
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-4 block">
          Hlavní partneři
        </span>
      </AnimatedSection>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
        {main.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.07}>
            <LogoTile partner={p} size="md" />
          </AnimatedSection>
        ))}
      </div>

      {/* Partneři */}
      <AnimatedSection>
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-4 block">
          Partneři
        </span>
      </AnimatedSection>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
        {partner.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.05}>
            <LogoTile partner={p} size="sm" />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

function LogoTile({
  partner: p,
  size,
}: {
  partner: (typeof partners)[0];
  size: "lg" | "md" | "sm";
}) {
  const heightCls = size === "lg" ? "h-28 sm:h-36" : size === "md" ? "h-20 sm:h-24" : "h-16 sm:h-20";
  const imgH = size === "lg" ? 90 : size === "md" ? 60 : 44;
  const imgW = size === "lg" ? 220 : size === "md" ? 150 : 110;

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      title={p.name}
      className={`group flex items-center justify-center ${heightCls} bg-white rounded-xl border-2 border-transparent hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 px-4`}
    >
      <Image
        src={p.logo}
        alt={p.name}
        width={imgW}
        height={imgH}
        className="object-contain w-auto group-hover:scale-105 transition-transform duration-300"
        style={{ maxHeight: imgH }}
      />
    </a>
  );
}
