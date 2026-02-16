import { prisma } from "@/lib/prisma";
import ResultsTable from "@/components/frontend/ResultsTable";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Výsledky",
  description: "Výsledky závodů série AC Heating Cup",
};

export default async function VysledkyPage() {
  const races = await prisma.race.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { date: "asc" },
    include: {
      results: {
        orderBy: { position: "asc" },
      },
    },
  });

  const racesWithResults = races.filter((r) => r.results.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-dark uppercase tracking-tight mb-8">
        Výsledky
      </h1>

      {racesWithResults.length > 0 ? (
        <ResultsTable
          races={racesWithResults.map((r) => ({
            id: r.id,
            title: r.title,
            slug: r.slug,
            results: r.results,
          }))}
        />
      ) : (
        <p className="text-gray-500">Výsledky budou zveřejněny po závodech.</p>
      )}
    </div>
  );
}
