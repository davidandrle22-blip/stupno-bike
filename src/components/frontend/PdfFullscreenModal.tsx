"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfFullscreenModal({
  file,
  downloadName,
  onClose,
}: {
  file: string;
  downloadName: string;
  onClose: () => void;
}) {
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const update = () => setPageWidth(Math.min(window.innerWidth - 32, 860));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950 animate-fadeIn">
      {/* Sticky header */}
      <div className="flex-shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-slate-900/95 backdrop-blur border-b border-white/[0.08]">
        <span className="text-sm font-semibold text-white/60 truncate">
          Propozice MČR Stupno 2026
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={file}
            download={downloadName}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] px-3 py-2 rounded-lg transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">Stáhnout</span>
          </a>
          <button
            onClick={onClose}
            aria-label="Zavřít PDF"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-slate-900 hover:bg-slate-200 transition-colors shadow-md flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollovatelný obsah — všechny stránky */}
      <div className="flex-1 overflow-y-auto bg-slate-800/30">
        <div className="flex flex-col items-center gap-4 py-6 px-4">
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
                Načítání PDF…
              </div>
            }
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="shadow-2xl">
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
