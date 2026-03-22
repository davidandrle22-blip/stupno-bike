import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function PoradatelPage({
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
        Pořadatel
      </h2>
      {race.organizer ? (
        <div
          className="tiptap-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: race.organizer }}
        />
      ) : (
        <p className="text-slate-400">Informace o pořadateli budou doplněny.</p>
      )}
    </div>
  );
}
