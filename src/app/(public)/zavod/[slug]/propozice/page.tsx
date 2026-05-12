import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const VSECHNY_KATEGORIE: { skupina: string; items: [string, string][] }[] = [
  { skupina: "Nejmladší", items: [
    ["Holky 5–6 let", "nar. 2020–2021"], ["Kluci 5–6 let", "nar. 2020–2021"],
    ["Holky 7–8 let", "nar. 2018–2019"], ["Kluci 7–8 let", "nar. 2018–2019"],
    ["Holky 9–10 let", "nar. 2016–2017"], ["Kluci 9–10 let", "nar. 2016–2017"],
  ]},
  { skupina: "Žáci", items: [
    ["Žákyně I", "11–12 let (nar. 2014–2015)"], ["Žáci I", "11–12 let (nar. 2014–2015)"],
    ["Žákyně II", "13–14 let (nar. 2012–2013)"], ["Žáci II", "13–14 let (nar. 2012–2013)"],
  ]},
  { skupina: "Kadeti a junioři", items: [
    ["Kadetky", "15–16 let (nar. 2010–2011)"], ["Kadeti", "15–16 let (nar. 2010–2011)"],
    ["Juniorky", "17–18 let (nar. 2008–2009)"], ["Junioři", "17–18 let (nar. 2008–2009)"],
  ]},
  { skupina: "Elite & U23", items: [
    ["Ženy U23", "19–22 let (nar. 2004–2007)"], ["Muži U23", "19–22 let (nar. 2004–2007)"],
    ["Ženy Elite", "23+ (nar. 2003 a dříve)"], ["Muži Elite", "23+ (nar. 2003 a dříve)"],
  ]},
  { skupina: "Hobby a masters", items: [
    ["Experti", "19 let a starší"], ["Masters", "35 let a starší"],
  ]},
];

export default async function PropozicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  const registrationUrl = race.registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace";

  return (
    <div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
        Propozice
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        MČR XCO Stupno — Velká cena CUBE
      </p>

      {/* PDF propozice */}
      <div className="mb-8">
        <a
          href="/propozice-mcr-stupno-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/[0.1] rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            {/* Dekorativní pruhy nahoře */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

            <div className="p-5 sm:p-7 flex items-center gap-5">
              {/* Ikona dokumentu */}
              <div className="flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 relative">
                <div className="w-full h-full bg-white/[0.08] border border-white/[0.12] rounded-lg flex flex-col items-center justify-center gap-1 shadow-lg">
                  <span className="text-[11px] font-black text-red-400 tracking-widest leading-none">PDF</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-1">Oficiální dokument</p>
                <p className="text-white font-bold text-base sm:text-lg leading-tight">Propozice MČR Stupno 2026</p>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">Kliknutím otevřete celé PDF</p>
              </div>

              {/* Šipka */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
            </div>
          </div>
        </a>

        {/* Stáhnout tlačítko */}
        <div className="mt-3">
          <a
            href="/propozice-mcr-stupno-2026.pdf"
            download="Propozice-MCR-Stupno-2026.pdf"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Stáhnout PDF
          </a>
        </div>
      </div>

      {race.description ? (
        <div
          className="tiptap-content prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: race.description }}
        />
      ) : (
        <div className="mb-8 space-y-4 text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Mistrovství České republiky horských kol XCO — Stupno — Velká cena CUBE.</strong>{" "}
            MČR XCO s bohem o tituly mistrů ČR. Technický okruh 4 km s náročnými
            sjezdy a výjezdy v areálu Ultramarinka.
          </p>
        </div>
      )}

      {/* Základní info */}
      <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-4 sm:p-6 mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
        {[
          { label: "Datum", value: "17. — 19. července 2026" },
          { label: "Místo", value: "ULTRAMARINKA — volnočasový areál, Břasy 224, 338 24" },
          { label: "Délka okruhu", value: "4 km" },
          { label: "Pořadatel", value: "Author team Stupno z.s., IČO: 22818057" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-slate-400 text-[11px] uppercase tracking-[0.2em] font-bold mb-0.5">{label}</p>
            <p className="text-white font-medium">{value}</p>
          </div>
        ))}
      </div>

      {/* Místo konání */}
      <div className="mb-8">
        <a
          href="https://maps.app.goo.gl/n5pTXDGfKVuZKJtu8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Zobrazit místo konání na mapě ↗
        </a>
      </div>

      {/* Kategorie */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-6">
          Závodní kategorie
        </h3>
        <div className="space-y-6">
          {VSECHNY_KATEGORIE.map((skupina) => (
            <div key={skupina.skupina}>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                {skupina.skupina}
              </p>
              <div className="flex flex-wrap gap-2">
                {skupina.items.map(([kat, vek]) => (
                  <span
                    key={kat}
                    className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-1.5 text-sm font-medium text-slate-200 flex flex-col"
                  >
                    {kat}
                    <span className="text-[10px] text-slate-500 font-normal mt-0.5">{vek}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registrace */}
      <div>
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold px-8 py-3 rounded-lg uppercase tracking-wide transition-all hover:scale-105"
        >
          Registrace do závodu ↗
        </a>
      </div>
    </div>
  );
}
