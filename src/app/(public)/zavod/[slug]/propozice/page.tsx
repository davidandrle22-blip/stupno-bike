import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PropozicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-dark uppercase tracking-tight mb-6">
        Propozice
      </h2>
      {race.description ? (
        <div
          className="tiptap-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: race.description }}
        />
      ) : (
        <p className="text-gray-500">Propozice budou doplněny.</p>
      )}
      {race.registrationUrl && (
        <div className="mt-8">
          <a
            href={race.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold px-8 py-3 rounded-lg uppercase tracking-wide transition-all hover:scale-105"
          >
            Registrace do závodu
          </a>
        </div>
      )}
    </div>
  );
}
