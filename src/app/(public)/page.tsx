import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import HeroSection from "@/components/frontend/HeroSection";

export const dynamic = "force-dynamic";
import {
  MapPin,
  Calendar,
  Trophy,
  ArrowRight,
  Mountain,
  Users,
  Timer,
} from "lucide-react";

export default async function HomePage() {
  const [races, partners, settings] = await Promise.all([
    prisma.race.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "asc" },
    }),
    prisma.partner.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.siteSettings.findFirst({ where: { id: "main" } }),
  ]);

  const race = races[0];

  return (
    <>
      {/* ═══════════════ HERO WITH VIDEO BACKGROUND ═══════════════ */}
      <HeroSection
        raceSlug={race?.slug ?? null}
        registrationUrl={settings?.registrationUrl ?? null}
        facebookUrl={settings?.facebookUrl ?? null}
        instagramUrl={settings?.instagramUrl ?? null}
      />

      {/* ═══════════════ SLOGAN — nad dlaždice ═══════════════ */}
      <section className="pt-12 sm:pt-16 pb-8 sm:pb-10 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
              Víc než závod!
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed mt-3 sm:mt-4">
              Stupno Bike je spojení vrcholového sportu s&nbsp;našlapaným doprovodným programem a&nbsp;neskutečnou atmosférou.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ STATS STRIP ═══════════════ */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-white/10">
              {[
                { icon: Trophy, value: "MČR", label: "Boj o tituly", color: "text-primary" },
                { icon: Mountain, value: "4,2 km", label: "Délka okruhu", color: "text-secondary" },
                { icon: Users, value: "650", label: "Závodníků", color: "text-accent" },
                { icon: Timer, value: "3 dny", label: "Program", color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900/60 backdrop-blur-sm p-4 sm:p-5 lg:p-7 text-center">
                  <stat.icon size={20} className={`${stat.color} mx-auto mb-2 opacity-80 sm:w-6 sm:h-6`} />
                  <p className={`text-xl sm:text-2xl lg:text-3xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-[0.15em] font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ 3 KARTY + IG + MAPA ═══════════════ */}
      {race && (
        <section className="py-14 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* 3 karty (Propozice, Program, Okruhy) */}
            <AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
                {[
                  {
                    href: `/zavod/${race.slug}/propozice`,
                    icon: Trophy,
                    title: "Propozice",
                    desc: "MČR — technický okruh 4,2 km s náročnými sjezdy a výjezdy v areálu Ultramarinka",
                    gradient: "from-primary/20 to-primary/10",
                    border: "hover:border-primary/40",
                    shadow: "hover:shadow-primary/15",
                    iconColor: "text-primary",
                    hoverColor: "group-hover:text-primary",
                  },
                  {
                    href: `/zavod/${race.slug}/program`,
                    icon: Calendar,
                    title: "Program",
                    desc: "Třídenní program — pátek štafety, sobota mládež a hobby, neděle Elite a vyhlášení MČR",
                    gradient: "from-secondary/20 to-secondary/10",
                    border: "hover:border-secondary/40",
                    shadow: "hover:shadow-secondary/15",
                    iconColor: "text-secondary",
                    hoverColor: "group-hover:text-secondary",
                  },
                  {
                    href: `/zavod/${race.slug}/okruhy`,
                    icon: MapPin,
                    title: "Okruhy & mapy",
                    desc: "GPX trasy, výškové profily a interaktivní mapa závodních okruhů",
                    gradient: "from-accent/20 to-accent/10",
                    border: "hover:border-accent/40",
                    shadow: "hover:shadow-accent/15",
                    iconColor: "text-accent",
                    hoverColor: "group-hover:text-accent",
                  },
                ].map((card, i) => (
                  <AnimatedSection key={card.title} delay={i * 0.12}>
                    <Link
                      href={card.href}
                      className={`group block bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] ${card.border} shadow-sm hover:shadow-xl ${card.shadow} transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 p-6 sm:p-7 lg:p-10 text-center`}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${card.iconColor}`} />
                      </div>
                      <h3 className={`font-bold text-lg sm:text-xl text-white mb-2 sm:mb-3 ${card.hoverColor} transition-colors`}>
                        {card.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {card.desc}
                      </p>
                      <div className={`mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${card.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        Zobrazit <ArrowRight size={12} />
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* IG screenshot (vlevo) + Mapa okruhů (vpravo) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

              {/* Instagram screenshot */}
              <AnimatedSection delay={0.1} className="h-full">
                <a
                  href="https://www.instagram.com/stupnobike/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 hover:border-pink-500/30 hover:shadow-2xl hover:shadow-pink-900/20 transition-all duration-500 relative h-[320px] sm:h-[420px] lg:h-[480px]"
                >
                  <img
                    src="/images/ig-screen.png"
                    alt="Stupno Bike na Instagramu — Víc než závod"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg whitespace-nowrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Sledujte nás @stupnobike
                    </span>
                  </div>
                </a>
              </AnimatedSection>

              {/* Mapa okruhů */}
              <AnimatedSection delay={0.2} className="h-full">
                <Link
                  href={`/zavod/${race.slug}/okruhy`}
                  className="group block rounded-2xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 relative h-[320px] sm:h-[420px] lg:h-[480px]"
                >
                  <img
                    src="/images/mapa-okruhu.png"
                    alt="Mapa závodních okruhů Stupno XC"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg whitespace-nowrap">
                      <MapPin size={15} className="text-primary" />
                      Interaktivní mapa & GPX trasy
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>

            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ PARTNERS ═══════════════ */}
      {partners.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-10 sm:mb-14 lg:mb-16">
                <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
                  Podporují nás
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-3">
                  Partneři
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
              </div>
            </AnimatedSection>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
              {partners.map((partner, i) => (
                <AnimatedSection key={partner.id} delay={i * 0.06}>
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="h-14 w-36 flex items-center justify-center grayscale group-hover:grayscale-0 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                        <span className="text-lg font-bold text-slate-400 group-hover:text-primary transition-colors">
                          {partner.name}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="h-14 w-36 flex items-center justify-center opacity-30">
                      <span className="text-lg font-bold text-slate-400">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
