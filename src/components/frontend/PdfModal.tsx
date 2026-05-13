"use client";

import { useEffect } from "react";

export default function PdfModal({ file, onClose }: { file: string; onClose: () => void }) {
  // Zablokuj scroll pozadí
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Zavři na Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950">
      {/* Horní lišta */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900 border-b border-white/[0.08]">
        <span className="text-sm font-semibold text-white/60 truncate">
          Propozice MČR Stupno 2026
        </span>
        <button
          onClick={onClose}
          className="flex-shrink-0 inline-flex items-center gap-2 ml-4 text-sm font-bold text-white bg-white/[0.08] hover:bg-white/[0.15] px-4 py-2 rounded-xl border border-white/10 transition-all duration-200"
          aria-label="Zavřít PDF"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Zavřít
        </button>
      </div>

      {/* Nativní PDF viewer */}
      <iframe
        src={file}
        className="flex-1 w-full border-0"
        title="Propozice MČR Stupno 2026"
      />
    </div>
  );
}
