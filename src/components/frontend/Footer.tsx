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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        {/* Top section: brand left + 3 columns right */}
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-20 mb-10 sm:mb-14 lg:mb-16">
          {/* Brand */}
          <div className="lg:w-[320px] shrink-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-sm">XC</span>
              </div>
              <div>
                <span className="font-extrabold text-sm uppercase tracking-tight block leading-none">
                  MČR XCO
                </span>
                <span className="text-primary-light text-[10px] font-semibold tracking-[0.2em] uppercase">
                  Horských kol Stupno
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Mistrovství České republiky horských kol XCO — Velká cena CUBE.
              17.–19. července 2026, areál Ultramarinka, Břasy.
            </p>
            <div className="flex gap-3 mt-6">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-[#1877F2]/30 hover:shadow-lg hover:shadow-[#1877F2]/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group flex items-center gap-2 text-white font-semibold text-xs px-3.5 py-2 rounded-xl hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    boxShadow: "0 4px 12px rgba(220,39,67,0.3)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>

          {/* 3 link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-8">
            {/* Navigace */}
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-5">
                Navigace
              </h4>
              <div className="space-y-1">
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
                    className="block text-white/40 hover:text-primary text-sm transition-colors duration-200 py-1.5 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Závod */}
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-3 sm:mb-5">
                Závod
              </h4>
              <div className="space-y-1">
                <Link href="/zavod/stupno/propozice" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200 py-1.5 min-h-[44px] flex items-center">Propozice</Link>
                <Link href="/zavod/stupno/program" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200 py-1.5 min-h-[44px] flex items-center">Program</Link>
                <Link href="/zavod/stupno/okruhy" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200 py-1.5 min-h-[44px] flex items-center">Okruhy &amp; mapy</Link>
                <Link href="/zavod/stupno/parkovani" className="block text-white/40 hover:text-primary text-sm transition-colors duration-200 py-1.5 min-h-[44px] flex items-center">Parkování</Link>
                <a
                  href="https://cycling.sportsoft.cz/mtb/#registrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent/70 hover:text-accent text-sm transition-colors duration-200 font-medium py-1.5 min-h-[44px] flex items-center"
                >
                  Registrace &rarr;
                </a>
              </div>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-3 sm:mb-5">
                Kontakt
              </h4>
              <div className="space-y-1 text-sm">
                {settings.contactEmail && (
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="block text-white/40 hover:text-primary transition-colors duration-200 py-1.5 min-h-[44px] flex items-center break-all"
                  >
                    {settings.contactEmail}
                  </a>
                )}
                {settings.contactPhone && (
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="block text-white/40 hover:text-primary transition-colors duration-200 py-1.5 min-h-[44px] flex items-center"
                  >
                    {settings.contactPhone}
                  </a>
                )}
                <p className="text-white/25 text-xs leading-relaxed pt-2">
                  Author team Stupno z.s.<br />
                  Stupno 245, 338 24 Břasy<br />
                  IČO: 22818057
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} MČR Stupno — Author team Stupno z.s. Všechna práva vyhrazena.
          </p>
          <span className="text-white/[0.07] text-[10px] uppercase tracking-[0.2em]">
            Cross-Country
          </span>
        </div>
      </div>
    </footer>
  );
}
