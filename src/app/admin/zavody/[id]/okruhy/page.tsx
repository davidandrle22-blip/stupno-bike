import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CircuitsManager from "@/components/admin/CircuitsManager";

export const dynamic = "force-dynamic";

export default async function RaceCircuitsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const race = await prisma.race.findUnique({
    where: { id },
    include: { circuits: { orderBy: { order: "asc" } } },
  });
  if (!race) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Okruhy: {race.title}
      </h1>
      <p className="text-gray-500 mb-6">Upload GPX souborů a správa okruhů</p>
      <CircuitsManager raceId={race.id} initialCircuits={race.circuits} />
    </div>
  );
}
