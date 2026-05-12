import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type ProgramItem = { time: string; desc: string; entertainment?: boolean };
type ProgramDay = { day: string; subtitle?: string; items: ProgramItem[] };

const ENTERTAINMENT_KEYWORDS = ["BEER RIDE", "DISCO", "Kapela", "DJ"];

const STATIC_PROGRAM: ProgramDay[] = [
  {
    day: "Pátek 17. července",
    items: [
      { time: "15:00", desc: "MČR štafety ŽÁCI" },
      { time: "16:30", desc: "MČR štafety DOSPĚLÍ" },
    ],
  },
  {
    day: "Sobota 18. července",
    items: [
      { time: "08:30 – 13:00", desc: "Technické disciplíny pro žákovské kategorie" },
      { time: "09:00 – 10:30", desc: "Dětské kategorie" },
      { time: "11:00", desc: "Odrážedla" },
      { time: "11:40 – 14:15", desc: "Žákovské kategorie" },
      { time: "15:00", desc: "Kadetky" },
      { time: "16:15", desc: "Kadeti, Master, Expert" },
      { time: "18:30", desc: "BEER RIDE — pivní jízda v kostýmech (startovné ZDARMA)", entertainment: true },
      { time: "19:00", desc: "DISCO party MČR v areálu — Dj Jirka Forman", entertainment: true },
      { time: "22:30 – 01:00", desc: "Kapela Pops", entertainment: true },
    ],
  },
  {
    day: "Neděle 19. července",
    items: [
      { time: "09:00", desc: "Junioři" },
      { time: "11:30", desc: "Ženy Elite / U23, Juniorky" },
      { time: "13:30", desc: "Muži Elite" },
    ],
  },
];

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

  // Use static program if DB has no data
  const displayProgram = programData.length > 0 ? programData : STATIC_PROGRAM;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-tight">
          Program závodu
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          17. — 19. července 2026 &bull; Areál Ultramarinka, Břasy
        </p>
      </div>

      <div className="space-y-10">
        {displayProgram.map((day, di) => (
          <div key={di}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-xl font-bold text-white leading-tight">{day.day}</h3>
                {day.subtitle && (
                  <p className="text-sm text-primary font-medium">{day.subtitle}</p>
                )}
              </div>
            </div>
            <div className="relative pl-5 sm:pl-8 border-l-2 border-primary/30 space-y-3">
              {day.items.map((item, ii) => (
                <div key={ii} className="relative">
                  <div className="absolute -left-[21px] sm:-left-[25px] top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-slate-900 shadow" />
                  <div
                    className={`rounded-lg p-4 shadow-sm border ${
                      item.entertainment
                        ? "bg-gradient-to-r from-accent/15 to-secondary/10 border-accent/25"
                        : "bg-white/[0.04] border-white/[0.08]"
                    }`}
                  >
                    <span className="text-sm font-bold text-secondary">
                      {item.time}
                    </span>
                    {item.entertainment && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Doprovodný program
                      </span>
                    )}
                    <p className="text-slate-200 font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
