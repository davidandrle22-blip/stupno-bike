"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PdfFullscreenModal = dynamic(() => import("./PdfFullscreenModal"), { ssr: false });

export default function PdfSection({ file, downloadName }: { file: string; downloadName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Preview karta ── */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-70" />
        <div className="flex items-center gap-4 p-4 sm:p-5">
          {/* PDF ikona */}
          <div className="flex-shrink-0 w-12 h-14 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col items-center justify-center gap-0.5">
            <span className="text-[10px] font-black text-red-400 tracking-widest">PDF</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">Propozice MČR Stupno 2026</p>
            <p className="text-slate-500 text-xs mt-0.5">Oficiální propozice závodu · PDF</p>
          </div>
          {/* Tlačítka */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              Číst
            </button>
            <a
              href={file}
              download={downloadName}
              className="inline-flex items-center justify-center gap-1.5 bg-white/[0.07] hover:bg-white/[0.13] text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Stáhnout
            </a>
          </div>
        </div>
      </div>

      {open && (
        <PdfFullscreenModal
          file={file}
          downloadName={downloadName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
