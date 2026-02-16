import { prisma } from "@/lib/prisma";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partneři",
  description: "Partneři série AC Heating Cup",
};

export default async function PartneriPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: "asc" },
  });

  const mainPartners = partners.filter((p) => p.type === "MAIN");
  const seriesPartners = partners.filter((p) => p.type === "SERIES");
  const racePartners = partners.filter((p) => p.type === "RACE");

  const renderPartnerGrid = (list: typeof partners) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {list.map((partner, i) => (
        <AnimatedSection key={partner.id} delay={i * 0.05}>
          <a
            href={partner.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 h-full"
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
            <span className="text-sm text-gray-500 text-center">
              {partner.name}
            </span>
          </a>
        </AnimatedSection>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-dark uppercase tracking-tight mb-8">
        Partneři
      </h1>

      {mainPartners.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-dark uppercase tracking-wide mb-4">
            Hlavní partner
          </h2>
          {renderPartnerGrid(mainPartners)}
        </div>
      )}

      {seriesPartners.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-dark uppercase tracking-wide mb-4">
            Partneři série
          </h2>
          {renderPartnerGrid(seriesPartners)}
        </div>
      )}

      {racePartners.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-dark uppercase tracking-wide mb-4">
            Partneři závodů
          </h2>
          {renderPartnerGrid(racePartners)}
        </div>
      )}
    </div>
  );
}
