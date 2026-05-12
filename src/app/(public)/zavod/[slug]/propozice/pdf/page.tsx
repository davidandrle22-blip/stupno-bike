import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import PdfViewerClient from "@/components/frontend/PdfViewerClient";

export const revalidate = 3600;

export default async function PropozicePdfPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Horní lišta */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/95 backdrop-blur border-b border-white/[0.08]">
        <span className="text-sm font-semibold text-white/70">
          Propozice MČR Stupno 2026
        </span>
        <Link
          href={`/zavod/${slug}/propozice`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2 rounded-xl transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Zavřít
        </Link>
      </div>

      {/* PDF viewer */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6">
        <PdfViewerClient
          file="/propozice-mcr-stupno-2026.pdf"
          downloadName="Propozice-MCR-Stupno-2026.pdf"
        />
      </div>
    </div>
  );
}
