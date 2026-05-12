import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Autor webu | Stupno Bike",
  robots: { index: false },
};

export default function DavidLePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
      <div className="max-w-md">
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-3">
          Autor webu
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-10">
          david.LE
        </h1>

        <div className="space-y-4 mb-12">
          <a
            href="mailto:davidandrle22@gmail.com"
            className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-200 group"
          >
            <span className="w-8 h-8 rounded-lg bg-white/[0.06] group-hover:bg-primary/15 flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="text-sm font-medium">davidandrle22@gmail.com</span>
          </a>

          <a
            href="tel:+420731941170"
            className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-200 group"
          >
            <span className="w-8 h-8 rounded-lg bg-white/[0.06] group-hover:bg-primary/15 flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span className="text-sm font-medium">731 941 170</span>
          </a>
        </div>

        <p className="text-white/20 text-xs leading-relaxed border-t border-white/[0.06] pt-6">
          © 2026 MČR Stupno — Author team Stupno z.s.<br />
          Všechna práva vyhrazena.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
