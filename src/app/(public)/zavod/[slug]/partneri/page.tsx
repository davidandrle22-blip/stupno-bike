import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 3600;

export default async function PartneriPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({
    where: { slug },
    include: {
      racePartners: {
        include: { partner: true },
        orderBy: { partner: { order: "asc" } },
      },
    },
  });
  if (!race) notFound();

  // Also show series-level partners
  const seriesPartners = await prisma.partner.findMany({
    where: { type: { in: ["MAIN", "SERIES"] } },
    orderBy: { order: "asc" },
  });

  const racePartnerIds = new Set(race.racePartners.map((rp) => rp.partnerId));
  const allPartners = [
    ...seriesPartners.filter((p) => !racePartnerIds.has(p.id)),
    ...race.racePartners.map((rp) => rp.partner),
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-6">
        Partneři závodu
      </h2>
      {allPartners.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {allPartners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.08] rounded-xl p-6 border border-white/[0.1] hover:border-white/20 hover:bg-white/[0.12] transition-all flex flex-col items-center justify-center gap-3"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-slate-300">
                  {partner.name}
                </span>
              )}
              <span className="text-sm text-slate-400">{partner.name}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">Partneři budou doplněni.</p>
      )}

      {/* Partneři Českého poháru */}
      <div className="mt-12">
        <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">
          Partneři Českého poháru XCO
        </h3>
        <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-6 flex items-center justify-center">
          <Image
            src="/images/pohar-cp-partneri.png"
            alt="Partneři Českého poháru XCO"
            width={900}
            height={300}
            className="w-full max-w-3xl h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
