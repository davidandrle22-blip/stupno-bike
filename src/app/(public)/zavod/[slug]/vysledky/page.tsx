import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ResultsTable from "@/components/frontend/ResultsTable";

export const dynamic = "force-dynamic";

export default async function RaceResultsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({
    where: { slug },
    include: { results: { orderBy: [{ category: "asc" }, { position: "asc" }] } },
  });
  if (!race) notFound();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-dark uppercase tracking-tight mb-6">
        Výsledky
      </h2>
      {race.results.length > 0 ? (
        <ResultsTable
          races={[
            {
              id: race.id,
              title: race.title,
              slug: race.slug,
              results: race.results,
            },
          ]}
        />
      ) : (
        <p className="text-gray-500">
          Výsledky tohoto závodu budou zveřejněny po závodě.
        </p>
      )}
    </div>
  );
}
