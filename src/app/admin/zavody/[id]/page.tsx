import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RaceForm from "@/components/admin/RaceForm";
import { updateRace } from "@/lib/actions/races";

export const dynamic = "force-dynamic";

export default async function EditRacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const race = await prisma.race.findUnique({ where: { id } });
  if (!race) notFound();

  const raceData = {
    id: race.id,
    title: race.title,
    date: race.date.toISOString(),
    dateEnd: race.dateEnd?.toISOString() || null,
    location: race.location,
    uciCategory: race.uciCategory,
    description: race.description,
    program: race.program,
    parking: race.parking,
    organizer: race.organizer,
    registrationUrl: race.registrationUrl,
    navOrder: race.navOrder,
    status: race.status,
    heroImage: race.heroImage,
    heroVideo: race.heroVideo,
    heroVideoWebm: race.heroVideoWebm,
    showHeroVideo: race.showHeroVideo,
    parkingImage: race.parkingImage,
  };

  const updateWithId = updateRace.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Upravit: {race.title}
      </h1>
      <RaceForm race={raceData} action={updateWithId} />
    </div>
  );
}
