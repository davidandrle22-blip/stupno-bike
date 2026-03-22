import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import RaceHero from "@/components/frontend/RaceHero";
import RaceSubNav from "@/components/frontend/RaceSubNav";

export const revalidate = 3600;

export async function generateStaticParams() {
  const races = await prisma.race.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return races.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) return {};
  return {
    title: race.title,
    description: `${race.title} - ${race.location}, ${formatDate(race.date)}`,
  };
}

export default async function RaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({
    where: { slug, status: "PUBLISHED" },
  });

  if (!race) notFound();

  return (
    <div>
      {/* Race Hero — full viewport */}
      <div className="-mt-16">
        <RaceHero
          title={race.title}
          date={race.date.toISOString()}
          location={race.location}
          uciCategory={race.uciCategory}
          heroImage={race.heroImage}
          heroVideo={race.showHeroVideo ? race.heroVideo : null}
          heroVideoWebm={race.showHeroVideo ? race.heroVideoWebm : null}
          registrationUrl={race.registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace"}
        />
      </div>

      {/* Sub navigation */}
      <RaceSubNav slug={slug} registrationUrl={race.registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace"} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-14 pb-24 sm:pb-10">{children}</div>

      {/* Mobile sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-dark/95 backdrop-blur-lg border-t border-white/10 shadow-xl z-40">
          <a
            href={race.registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-accent to-accent-dark text-white font-bold py-3 rounded-xl uppercase tracking-wide"
          >
            Registrace do závodu
          </a>
        </div>
    </div>
  );
}
