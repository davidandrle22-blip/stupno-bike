import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GpxMap from "@/components/frontend/GpxMap";

export default async function OkruhyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({
    where: { slug },
    include: { circuits: { orderBy: { order: "asc" } } },
  });
  if (!race) notFound();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-dark uppercase tracking-tight mb-6">
        Okruhy
      </h2>
      {race.circuits.length > 0 ? (
        <GpxMap
          circuits={race.circuits.map((c) => ({
            id: c.id,
            name: c.name,
            categories: c.categories,
            color: c.color,
            gpxData: c.gpxData,
          }))}
        />
      ) : (
        <p className="text-gray-500">
          Mapy okruhů budou doplněny po schválení tratí.
        </p>
      )}
    </div>
  );
}
