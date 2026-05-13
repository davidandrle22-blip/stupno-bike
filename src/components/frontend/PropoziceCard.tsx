"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Trophy, ArrowRight } from "lucide-react";

const PdfFullscreenModal = dynamic(() => import("./PdfFullscreenModal"), { ssr: false });

export default function PropoziceCard({ href }: { href: string }) {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <div className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/15 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 p-6 sm:p-7 lg:p-10 text-center">
        {/* Klik na kartu → podstránka (absolutní overlay pod tlačítky) */}
        <Link href={href} className="absolute inset-0 z-10 rounded-2xl" aria-label="Zobrazit propozice" />

        {/* Ikona */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-500">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
        </div>

        {/* Text */}
        <h3 className="font-bold text-lg sm:text-xl text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
          Propozice
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          MČR — technický okruh 4 km s náročnými sjezdy a výjezdy v areálu Ultramarinka
        </p>

        {/* Akční tlačítka — nad overlay linkem */}
        <div className="relative z-20 flex items-center justify-center gap-2 mt-5">
          <button
            onClick={() => setPdfOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/80 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            Číst
          </button>
          <a
            href="/propozice-mcr-stupno-2026.pdf"
            download="Propozice-MCR-Stupno-2026.pdf"
            className="inline-flex items-center justify-center gap-1.5 bg-white/[0.07] hover:bg-white/[0.13] text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Stáhnout
          </a>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Zobrazit <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {pdfOpen && (
        <PdfFullscreenModal
          file="/propozice-mcr-stupno-2026.pdf"
          downloadName="Propozice-MCR-Stupno-2026.pdf"
          onClose={() => setPdfOpen(false)}
        />
      )}
    </>
  );
}
