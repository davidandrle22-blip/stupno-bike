import type { Metadata } from "next";
import SocialLinks from "@/components/frontend/SocialLinks";

export const metadata: Metadata = {
  title: "Kontakt | MČR XCO Stupno 2026",
};

export default function KontaktPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
      <div className="mb-8 sm:mb-12">
        <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
          Spojte se s námi
        </span>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-3">
          Kontakt
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-5 rounded-full" />
      </div>

      {/* Kontaktní osoby */}
      <section className="mb-10 sm:mb-16">
        <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-4 sm:mb-6">
          Kontaktní osoby
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Ondřej Paur */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] shadow-sm p-5 sm:p-8">
            <p className="font-black text-xl text-white mb-1">Ondřej Paur</p>
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">
              Manažer závodu
            </p>
            <div className="space-y-2 text-sm mb-5">
              <a
                href="tel:+420774044794"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors font-medium"
              >
                +420 774 044 794
              </a>
              <a
                href="mailto:paur@joycycling.cz"
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors font-medium"
              >
                paur@joycycling.cz
              </a>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Partneři, PR, média, EXPO, program
            </p>
          </div>

          {/* Jaroslav Ryba */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] shadow-sm p-5 sm:p-8">
            <p className="font-black text-xl text-white mb-1">Jaroslav Ryba</p>
            <p className="text-secondary font-semibold text-sm uppercase tracking-wide mb-4">
              Ředitel závodu
            </p>
            <div className="space-y-2 text-sm mb-5">
              <a
                href="tel:+420603710061"
                className="flex items-center gap-2 text-slate-300 hover:text-secondary transition-colors font-medium"
              >
                +420 603 710 061
              </a>
              <a
                href="mailto:jardaryba@seznam.cz"
                className="flex items-center gap-2 text-slate-300 hover:text-secondary transition-colors font-medium"
              >
                jardaryba@seznam.cz
              </a>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Parkování, týmové zázemí, technické zabezpečení
            </p>
          </div>

          {/* Josef Blecha */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] shadow-sm p-5 sm:p-8">
            <p className="font-black text-xl text-white mb-1">Josef Blecha</p>
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-4">
              Ředitel trati
            </p>
            <div className="space-y-2 text-sm mb-5">
              <a
                href="tel:+420773290677"
                className="flex items-center gap-2 text-slate-300 hover:text-accent transition-colors font-medium"
              >
                +420 773 290 677
              </a>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Okruhy, sekce
            </p>
          </div>
        </div>
      </section>

      {/* Pořadatelé */}
      <section className="mb-10 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-5 sm:p-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Pořadatel MČR XCO Stupno
          </h2>
          <p className="font-bold text-white text-lg mb-2">Author team Stupno z.s.</p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Stupno 245, 338 24 Břasy<br />
            IČO: 22818057
          </p>
        </div>

        <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-5 sm:p-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Pořadatel seriálu Český pohár
          </h2>
          <p className="font-bold text-white text-lg mb-2">Pro Sport MTB s.r.o.</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Kolová 264, 360 01 Kolová<br />
            Kontakt: Josef Dlohoš
          </p>
          <div className="space-y-1 text-sm">
            <a
              href="tel:+420778421678"
              className="block text-slate-300 hover:text-primary transition-colors font-medium"
            >
              +420 778 421 678
            </a>
            <a
              href="mailto:josef.dlohos@gmail.com"
              className="block text-slate-300 hover:text-primary transition-colors font-medium"
            >
              josef.dlohos@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Sledujte nás */}
      <section>
        <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-6">
          Sledujte nás
        </h2>
        <SocialLinks
          facebookUrl="https://www.facebook.com/stupnobike/"
          instagramUrl="https://www.instagram.com/stupnobike/"
        />
      </section>
    </div>
  );
}
