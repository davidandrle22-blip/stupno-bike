import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type ProgramItem = { time: string; desc: string };
type ProgramDay = { day: string; items: ProgramItem[] };

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  let programData: ProgramDay[] = [];
  if (race.program) {
    try {
      programData = JSON.parse(race.program);
    } catch {
      programData = [];
    }
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-dark uppercase tracking-tight mb-6">
        Program závodu
      </h2>

      {programData.length > 0 ? (
        <div className="space-y-8">
          {programData.map((day, di) => (
            <div key={di}>
              <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                {day.day}
              </h3>
              <div className="relative pl-8 border-l-2 border-primary/30 space-y-4">
                {day.items.map((item, ii) => (
                  <div key={ii} className="relative">
                    <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-white shadow" />
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                      <span className="text-sm font-bold text-secondary">
                        {item.time}
                      </span>
                      <p className="text-dark font-medium mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Program bude doplněn.</p>
      )}
    </div>
  );
}
