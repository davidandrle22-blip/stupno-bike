import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPartnersByTier, partners } from "@/data/partners";

export const revalidate = 3600;

export default async function PartneriPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  const general = getPartnersByTier("general");
  const main = getPartnersByTier("main");
  const partner = getPartnersByTier("partner");

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-6">
        Partneři závodu
      </h2>

      {/* Generální partneři */}
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-3">
        Generální partneři
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {general.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-6 border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3"
          >
            <Image
              src={p.logo}
              alt={p.name}
              width={260}
              height={100}
              className="h-16 w-auto object-contain"
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">
              {p.name}
            </span>
          </a>
        ))}
      </div>

      {/* Hlavní partneři */}
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-3">
        Hlavní partneři
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {main.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-5 border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3"
          >
            <Image
              src={p.logo}
              alt={p.name}
              width={180}
              height={70}
              className="h-12 w-auto object-contain"
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">
              {p.name}
            </span>
          </a>
        ))}
      </div>

      {/* Partneři */}
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-3">
        Partneři
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {partner.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2"
          >
            <Image
              src={p.logo}
              alt={p.name}
              width={140}
              height={56}
              className="h-10 w-auto object-contain"
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">
              {p.name}
            </span>
          </a>
        ))}
      </div>

      {/* Partneři Českého poháru */}
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/25 mb-3">
        Partneři Českého poháru XCO
      </p>
      <div className="bg-white rounded-2xl p-6 flex items-center justify-center">
        <Image
          src="/images/pohar-cp-partneri.png"
          alt="Partneři Českého poháru XCO"
          width={900}
          height={300}
          className="w-full max-w-3xl h-auto object-contain"
        />
      </div>
    </div>
  );
}
