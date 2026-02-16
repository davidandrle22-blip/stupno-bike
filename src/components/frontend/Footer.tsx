import Link from "next/link";

type Settings = {
  seriesName: string;
  contactEmail: string | null;
  contactPhone: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
};

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[200px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        {/* Top section: brand left + 3 columns right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <div className="lg:w-[320px] shrink-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-sm">XC</span>
              </div>
              <div>
                <span className="font-extrabold text-sm uppercase tracking-tight block leading-none">
                  Mistrovství XC
                </span>
                <span className="text-primary-light text-[10px] font-semibold tracking-[0.2em] uppercase">
                  Horských kol Stupno
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Prestižní závod horských kol UCI XCO cross-country kategorie C1
              v obci Stupno u Rokycan.
            </p>
            <div className="flex gap-3 mt-6">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-primary/20 border border-white/[0.06] flex items-center justify-center transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <span className="text-xs font-bold text-white/60">FB</span>
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-primary/20 border border-white/[0.06] flex items-center justify-center transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <span className="text-xs font-bold text-white/60">IG</span>
                </a>
              )}
            </div>
          </div>

          {/* 3 link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8">
            {/* Navigace */}
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-5">
                Navigace
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Novinky", href: "/novinky" },
                  { label: "Výsledky", href: "/vysledky" },
                  { label: "Pravidla", href: "/pravidla" },
                  { label: "O nás", href: "/o-nas" },
                  { label: "Kontakt", href: "/kontakt" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-white/40 hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Závod */}
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-5">
                Závod
              </h4>
              <div className="space-y-3">
                <Link href="/zavod/stupno/propozice" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200">Propozice</Link>
                <Link href="/zavod/stupno/program" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200">Program</Link>
                <Link href="/zavod/stupno/okruhy" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200">Okruhy &amp; mapy</Link>
                <Link href="/zavod/stupno/parkovani" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200">Parkování</Link>
                <a
                  href="https://registrace.sportobchod.cz/stupno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent/70 hover:text-accent text-sm transition-colors duration-200 font-medium"
                >
                  Registrace &rarr;
                </a>
              </div>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-5">
                Kontakt
              </h4>
              <div className="space-y-3 text-sm">
                {settings.contactEmail && (
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="block text-white/40 hover:text-primary transition-colors duration-200"
                  >
                    {settings.contactEmail}
                  </a>
                )}
                {settings.contactPhone && (
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="block text-white/40 hover:text-primary transition-colors duration-200"
                  >
                    {settings.contactPhone}
                  </a>
                )}
                <p className="text-white/25 text-xs leading-relaxed pt-2">
                  TJ Stupno Bike<br />
                  Stupno 123<br />
                  337 01 Rokycany
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Mistrovství XC Horských kol
            STUPNO. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-white/10 text-[10px] uppercase tracking-[0.2em]">
              UCI XCO
            </span>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-white/10 text-[10px] uppercase tracking-[0.2em]">
              Cross-Country
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
