import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ResultsManager from "@/components/admin/ResultsManager";

export const dynamic = "force-dynamic";

export default async function RaceResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const race = await prisma.race.findUnique({
    where: { id },
    include: { results: { orderBy: [{ category: "asc" }, { position: "asc" }] } },
  });
  if (!race) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Výsledky: {race.title}
      </h1>
      <p className="text-gray-500 mb-6">Správa výsledků závodu</p>
      <ResultsManager raceId={race.id} initialResults={race.results} />
    </div>
  );
}
