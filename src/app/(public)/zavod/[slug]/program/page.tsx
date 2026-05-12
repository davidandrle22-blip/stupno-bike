import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type ProgramItem = { time: string; desc: string; entertainment?: boolean };
type ProgramDay = { day: string; subtitle?: string; items: ProgramItem[] };

const ENTERTAINMENT_KEYWORDS = ["BEER RIDE", "DISCO", "Kapela", "DJ"];

const STATIC_PROGRAM: ProgramDay[] = [
  {
    day: "Pátek 17. července",
    subtitle: "Štafety a trénink",
    items: [
      { time: "13:00", desc: "Otevření kanceláře závodu" },
      { time: "13:30", desc: "Oficiální trénink pro technické disciplíny (do 15:00)" },
      { time: "14:00", desc: "Oficiální trénink pro štafety — jen pro závodníky s číslem na štafety (do 14:50)" },
      { time: "15:00", desc: "MČR štafety ŽÁCI" },
      { time: "16:30", desc: "MČR štafety DOSPĚLÍ" },
      { time: "17:00", desc: "Vyhlášení vítězů štafet (po dojetí závodu)" },
      { time: "17:15", desc: "Oficiální trénink pro sobotní kategorie (do 18:30)" },
    ],
  },
  {
    day: "Sobota 18. července",
    subtitle: "Mládež, hobby a doprovodný program",
    items: [
      { time: "08:00", desc: "Kancelář závodu (do 15:00)" },
      { time: "08:30", desc: "Technické disciplíny pro žákovské kategorie (do 13:00)" },
      { time: "09:00", desc: "Kluci 5–6 let (nar. 2020–2021)" },
      { time: "09:10", desc: "Holky 5–6 let (nar. 2020–2021)" },
      { time: "09:20", desc: "Holky 7–8 let (nar. 2018–2019)" },
      { time: "09:40", desc: "Kluci 7–8 let (nar. 2018–2019)" },
      { time: "10:00", desc: "Holky 9–10 let (nar. 2016–2017)" },
      { time: "10:30", desc: "Kluci 9–10 let (nar. 2016–2017)" },
      { time: "11:00", desc: "Odrážedla" },
      { time: "11:40", desc: "Žákyně II (13–14 let, nar. 2012–2013)" },
      { time: "12:35", desc: "Žáci II (13–14 let, nar. 2012–2013)" },
      { time: "13:30", desc: "Žákyně I (11–12 let, nar. 2014–2015)" },
      { time: "14:15", desc: "Žáci I (11–12 let, nar. 2014–2015)" },
      { time: "15:00", desc: "Kadetky (15–16 let)" },
      { time: "16:15", desc: "Kadeti (15–16 let), Masters (35+), Experti (19+)" },
      { time: "17:15", desc: "Vyhlášení odpoledních kategorií" },
      { time: "17:15", desc: "Oficiální trénink na trati XCO (do 18:15, trať otevřena po dojetí Masters)" },
      { time: "18:30", desc: "BEER RIDE — pivní jízda v kostýmech (startovné ZDARMA)", entertainment: true },
      { time: "19:00", desc: "DISCO party MČR v areálu — DJ Jirka Forman", entertainment: true },
      { time: "22:30", desc: "Kapela Pops (do 01:00)", entertainment: true },
    ],
  },
  {
    day: "Neděle 19. července",
    subtitle: "Elite a vyhlášení MČR",
    items: [
      { time: "08:00", desc: "Kancelář závodu (do 15:00)" },
      { time: "09:00", desc: "Junioři (17–18 let, nar. 2008–2009)" },
      { time: "10:30", desc: "Trénink na trati XCO (do 11:15)" },
      { time: "11:30", desc: "Ženy Elite / U23, Juniorky (17–18 let), Kadetky (15–16 let)" },
      { time: "13:30", desc: "Muži Elite / U23 (19 let a starší)" },
      { time: "15:15", desc: "Slavnostní vyhlášení výsledků závodů XCO" },
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
