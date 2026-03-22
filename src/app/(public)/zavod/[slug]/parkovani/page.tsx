import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 120;

export default async function ParkovaniPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-6">
        Parkování
      </h2>
      {race.parking ? (
        <>
          <div
            className="tiptap-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: race.parking }}
          />
          {race.parkingImage && (
            <div className="mt-6">
              <img
                src={race.parkingImage}
                alt="Schéma parkování"
                className="rounded-xl shadow-lg max-w-full"
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-slate-400">Informace o parkování budou doplněny.</p>
      )}
    </div>
  );
}
