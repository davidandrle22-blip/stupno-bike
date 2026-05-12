import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

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
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Sticky lišta se zavíracím tlačítkem */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/95 backdrop-blur-sm border-b border-white/[0.08] z-50">
        <span className="text-sm font-semibold text-white/60 truncate">
          Propozice MČR Stupno 2026
        </span>
        <Link
          href={`/zavod/${slug}/propozice`}
          className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold text-white bg-white/[0.08] hover:bg-primary hover:text-white px-4 py-2 rounded-xl border border-white/10 hover:border-primary transition-all duration-200 ml-4"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Zpět na web
        </Link>
      </div>

      {/* Nativní PDF viewer přes celou výšku */}
      <iframe
        src="/propozice-mcr-stupno-2026.pdf"
        className="flex-1 w-full border-0"
        title="Propozice MČR Stupno 2026"
      />
    </div>
  );
}
