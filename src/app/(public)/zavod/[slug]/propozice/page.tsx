import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const VSECHNY_KATEGORIE = [
  { skupina: "Nejmladší", items: ["Holky 5–6 let", "Kluci 5–6 let", "Holky 7–8 let", "Kluci 7–8 let", "Holky 9–10 let", "Kluci 9–10 let"] },
  { skupina: "Žáci", items: ["Žákyně I", "Žáci I", "Žákyně II", "Žáci II"] },
  { skupina: "Kadeti a junioři", items: ["Kadetky", "Kadeti", "Juniorky", "Junioři"] },
  { skupina: "Elite", items: ["Ženy Elite / U23", "Muži Elite"] },
  { skupina: "Hobby a masters", items: ["Masters", "Experti"] },
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
      <p className="text-slate-400 text-sm mb-6 sm:mb-8">
        MČR XCO Stupno — Velká cena CUBE
      </p>

      {race.description ? (
        <div
          className="tiptap-content prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: race.description }}
        />
      ) : (
        <div className="mb-8 space-y-4 text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Mistrovství České republiky horských kol XCO — Stupno — Velká cena CUBE.</strong>{" "}
            MČR XCO s bohem o tituly mistrů ČR. Technický okruh 4,2 km s náročnými
            sjezdy a výjezdy v areálu Ultramarinka.
          </p>
        </div>
      )}

      {/* Základní info */}
      <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-4 sm:p-6 mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
        {[
          { label: "Datum", value: "17. — 19. července 2026" },
          { label: "Místo", value: "ULTRAMARINKA — volnočasový areál, Břasy 224, 338 24" },
          { label: "Délka okruhu", value: "4,2 km" },
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
          href="https://www.google.com/maps/place/Ultramarinka/@49.8324452,13.5836209"
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
                {skupina.items.map((kat) => (
                  <span
                    key={kat}
                    className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-3 py-1.5 text-sm font-medium text-slate-200"
                  >
                    {kat}
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
