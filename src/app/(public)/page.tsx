import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import Countdown from "@/components/frontend/Countdown";
import HeroWithVideo from "@/components/frontend/HeroWithVideo";

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
  const [races, articles, partners, settings] = await Promise.all([
    prisma.race.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "asc" },
    }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
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
      <section className="relative min-h-screen flex items-center overflow-hidden -mt-16 pt-16">
        {/* Video background + overlays */}
        <HeroWithVideo
          posterUrl="/media/races/stupno/hero-poster.jpg"
          videoUrl="/media/races/stupno/hero-video-720p.mp4"
          videoWebmUrl="/media/races/stupno/hero-video-720p.webm"
          youtubeUrl="https://www.youtube.com/watch?v=mzn6v-TePEs"
        />

        {/* Content on top of video */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-full px-5 py-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-white/70 text-[13px] font-medium tracking-wide">
                  UCI C1 &bull; XCO Cross-Country
                </span>
              </div>

              <h1 className="font-black text-white uppercase tracking-tight leading-[0.85]">
                <span className="block text-[clamp(2.5rem,6vw,4.5rem)]">Mistrovství XC</span>
                <span className="block text-[clamp(2.5rem,6vw,4.5rem)] gradient-text mt-0.5">Horských kol</span>
                <span className="block text-[clamp(3rem,7vw,5.5rem)] mt-0.5">STUPNO</span>
              </h1>

              <div className="flex items-center gap-4 mt-7 text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  <Calendar size={15} className="text-primary-light" />
                  <span className="text-white/70 font-medium">17. července 2026</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-secondary" />
                  <span className="text-white/70 font-medium">Stupno u Rokycan</span>
                </span>
              </div>
            </AnimatedSection>

            {/* Countdown */}
            <AnimatedSection delay={0.25}>
              <div className="mt-10 mb-10">
                <p className="text-white text-[11px] uppercase tracking-[0.35em] mb-4 font-semibold">
                  Do startu zbývá
                </p>
                <Countdown targetDate="2026-07-17T09:00:00" />
              </div>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={race ? `/zavod/${race.slug}` : "/vysledky"}
                  className="group bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-7 py-3.5 rounded-xl uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center gap-2 justify-center"
                >
                  Detail závodu
                  <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                {settings?.registrationUrl && (
                  <a
                    href={settings.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-accent to-accent-dark text-white font-bold px-7 py-3.5 rounded-xl uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 text-center"
                  >
                    Registrace
                  </a>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-9 border-2 border-white/15 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2.5 bg-primary/60 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Skewed divider */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white z-10" style={{ clipPath: "polygon(0 75%, 100% 0%, 100% 100%, 0% 100%)" }} />
      </section>

      {/* ═══════════════ STATS STRIP ═══════════════ */}
      <section className="bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-4 -mt-1">
          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-border rounded-2xl overflow-hidden shadow-lg shadow-gray-border/50 border border-gray-border">
              {[
                { icon: Trophy, value: "UCI C1", label: "Kategorie", color: "text-primary" },
                { icon: Mountain, value: "4.2 km", label: "Délka okruhu", color: "text-secondary" },
                { icon: Users, value: "200+", label: "Závodníků", color: "text-accent" },
                { icon: Timer, value: "2 dny", label: "Program", color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-5 sm:p-7 text-center">
                  <stat.icon size={22} className={`${stat.color} mx-auto mb-2.5 opacity-80`} />
                  <p className={`text-xl sm:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-[0.15em] font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ ABOUT THE RACE ═══════════════ */}
      {race && (
        <section className="py-24 sm:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
                  Sezóna 2026
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-dark uppercase tracking-tight mt-3">
                  O závodě
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  href: `/zavod/${race.slug}/propozice`,
                  icon: Trophy,
                  title: "Propozice",
                  desc: "UCI C1 kategorie, technický okruh s náročnými sjezdy a výjezdy v okolí obce Stupno",
                  gradient: "from-primary/10 to-primary/5",
                  border: "hover:border-primary/30",
                  shadow: "hover:shadow-primary/10",
                  iconColor: "text-primary",
                  hoverColor: "group-hover:text-primary",
                },
                {
                  href: `/zavod/${race.slug}/program`,
                  icon: Calendar,
                  title: "Program",
                  desc: "Dvoudenní program — sobota kategorie mládež, neděle Elite a slavnostní vyhlášení",
                  gradient: "from-secondary/10 to-secondary/5",
                  border: "hover:border-secondary/30",
                  shadow: "hover:shadow-secondary/10",
                  iconColor: "text-secondary",
                  hoverColor: "group-hover:text-secondary",
                },
                {
                  href: `/zavod/${race.slug}/okruhy`,
                  icon: MapPin,
                  title: "Okruhy & mapy",
                  desc: "GPX trasy, výškové profily a interaktivní mapa závodních okruhů",
                  gradient: "from-accent/10 to-accent/5",
                  border: "hover:border-accent/30",
                  shadow: "hover:shadow-accent/10",
                  iconColor: "text-accent",
                  hoverColor: "group-hover:text-accent",
                },
              ].map((card, i) => (
                <AnimatedSection key={card.title} delay={i * 0.12}>
                  <Link
                    href={card.href}
                    className={`group block bg-white rounded-2xl border border-gray-100 ${card.border} shadow-sm hover:shadow-xl ${card.shadow} transition-all duration-500 hover:-translate-y-2 p-8 sm:p-10 text-center`}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                    </div>
                    <h3 className={`font-bold text-xl text-dark mb-3 ${card.hoverColor} transition-colors`}>
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                    <div className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${card.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      Zobrazit <ArrowRight size={12} />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ NEWS ═══════════════ */}
      {articles.length > 0 && (
        <section className="py-24 sm:py-32 bg-gray-bg relative">
          <div className="absolute -top-16 left-0 right-0 h-20 bg-gray-bg" style={{ clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0% 100%)" }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <span className="text-secondary text-[11px] uppercase tracking-[0.4em] font-bold">
                  Aktuality
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-dark uppercase tracking-tight mt-3">
                  Novinky
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mt-5 rounded-full" />
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article, i) => (
                <AnimatedSection key={article.id} delay={i * 0.1}>
                  <Link
                    href={`/novinky/${article.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
                      {article.featuredImage ? (
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                            <span className="text-2xl opacity-20">&#9998;</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6">
                      <p className="text-[11px] text-primary font-bold uppercase tracking-[0.15em] mb-2.5">
                        {article.publishedAt
                          ? formatDate(article.publishedAt)
                          : formatDate(article.createdAt)}
                      </p>
                      <h3 className="font-bold text-lg text-dark group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-400 text-sm mt-2.5 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.3}>
              <div className="text-center mt-12">
                <Link
                  href="/novinky"
                  className="group inline-flex items-center gap-2 border-2 border-dark text-dark font-bold px-7 py-3 rounded-xl uppercase tracking-wide hover:bg-dark hover:text-white transition-all duration-300"
                >
                  Všechny novinky
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ═══════════════ PARTNERS ═══════════════ */}
      {partners.length > 0 && (
        <section className="py-24 sm:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
                  Podporují nás
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-dark uppercase tracking-tight mt-3">
                  Partneři
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
              </div>
            </AnimatedSection>
            <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
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
                        <span className="text-lg font-bold text-gray-400 group-hover:text-primary transition-colors">
                          {partner.name}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="h-14 w-36 flex items-center justify-center opacity-30">
                      <span className="text-lg font-bold text-gray-400">
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
