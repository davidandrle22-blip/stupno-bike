import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

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
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-6">
        Výsledky
      </h2>
      <p className="text-slate-400">
        Připravujeme – po závodě.
      </p>
    </div>
  );
}
