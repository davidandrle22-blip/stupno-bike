import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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
      <h2 className="text-2xl sm:text-3xl font-extrabold text-dark uppercase tracking-tight mb-6">
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
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-3"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-gray-400">
                  {partner.name}
                </span>
              )}
              <span className="text-sm text-gray-500">{partner.name}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Partneři budou doplněni.</p>
      )}
    </div>
  );
}
