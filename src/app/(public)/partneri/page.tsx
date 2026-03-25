import Image from "next/image";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import type { Metadata } from "next";
import { partners, getPartnersByTier } from "@/data/partners";

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

      {/* GENERÁLNÍ PARTNEŘI */}
      <AnimatedSection>
        <h2 className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/30 mb-6">
          Generální partneři
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-14 sm:mb-20">
        {general.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.1}>
            <PartnerCard partner={p} large />
          </AnimatedSection>
        ))}
      </div>

      {/* HLAVNÍ PARTNEŘI */}
      <AnimatedSection>
        <h2 className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/30 mb-6">
          Hlavní partneři
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-14 sm:mb-20">
        {main.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.07}>
            <PartnerCard partner={p} />
          </AnimatedSection>
        ))}
      </div>

      {/* PARTNEŘI */}
      <AnimatedSection>
        <h2 className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/30 mb-6">
          Partneři
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {partner.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.05}>
            <PartnerCard partner={p} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

function PartnerCard({ partner: p, large = false }: { partner: (typeof partners)[0]; large?: boolean }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] p-6 sm:p-8 transition-all duration-300"
      style={{ boxShadow: "0 0 0 0 rgba(74,144,226,0)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(74,144,226,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,144,226,0.25)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(74,144,226,0)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {/* Logo */}
      <div className={`flex items-center justify-center mb-6 ${large ? "h-20" : "h-14"}`}>
        <Image
          src={p.logo}
          alt={p.name}
          width={large ? 200 : 140}
          height={large ? 80 : 56}
          className="object-contain w-auto"
          style={{ maxHeight: large ? 80 : 56 }}
        />
      </div>

      {/* Name */}
      <h3 className={`font-bold text-white mb-3 ${large ? "text-xl" : "text-base"}`}>
        {p.name}
      </h3>

      {/* Description */}
      <p className="text-white/45 text-sm leading-relaxed flex-1 mb-6">
        {p.description}
      </p>

      {/* CTA */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/40 group-hover:text-primary transition-colors duration-200">
        Navštívit web
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
