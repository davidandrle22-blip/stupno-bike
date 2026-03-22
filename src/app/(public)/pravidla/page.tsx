import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pravidla a kategorie | MČR XCO Stupno 2026",
};

const KATEGORIE: { skupina: string; items: [string, string][]; color: string }[] = [
  {
    skupina: "Nejmladší",
    items: [
      ["Holky 5–6 let", "nar. 2020–2021"],
      ["Kluci 5–6 let", "nar. 2020–2021"],
      ["Holky 7–8 let", "nar. 2018–2019"],
      ["Kluci 7–8 let", "nar. 2018–2019"],
      ["Holky 9–10 let", "nar. 2016–2017"],
      ["Kluci 9–10 let", "nar. 2016–2017"],
    ],
    color: "text-secondary",
  },
  {
    skupina: "Žáci",
    items: [
      ["Žákyně I", "11–12 let (nar. 2014–2015)"],
      ["Žáci I", "11–12 let (nar. 2014–2015)"],
      ["Žákyně II", "13–14 let (nar. 2012–2013)"],
      ["Žáci II", "13–14 let (nar. 2012–2013)"],
    ],
    color: "text-primary",
  },
  {
    skupina: "Kadeti a junioři",
    items: [
      ["Kadetky", "15–16 let (nar. 2010–2011)"],
      ["Kadeti", "15–16 let (nar. 2010–2011)"],
      ["Juniorky", "17–18 let (nar. 2008–2009)"],
      ["Junioři", "17–18 let (nar. 2008–2009)"],
    ],
    color: "text-accent",
  },
  {
    skupina: "Elite & U23",
    items: [
      ["Ženy U23", "19–22 let (nar. 2004–2007)"],
      ["Muži U23", "19–22 let (nar. 2004–2007)"],
      ["Ženy Elite", "23 let a starší (nar. 2003 a dříve)"],
      ["Muži Elite", "23 let a starší (nar. 2003 a dříve)"],
    ],
    color: "text-primary",
  },
  {
    skupina: "Hobby a masters",
    items: [
      ["Experti", "19 let a starší"],
      ["Masters", "35 let a starší"],
    ],
    color: "text-secondary",
  },
];

export default function PravidlaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
      <div className="mb-8 sm:mb-12">
        <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
          Informace pro závodníky
        </span>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-3">
          Pravidla a kategorie
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-5 rounded-full" />
      </div>

      {/* Pravidla */}
      <section className="mb-8 sm:mb-14 bg-white/[0.04] rounded-2xl border border-white/[0.08] p-5 sm:p-8">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">
          Pravidla závodu
        </h2>
        <p className="text-slate-300 text-base leading-relaxed mb-6">
          Závodí se dle pravidel Českého svazu cyklistiky a seriálu Český pohár MTB.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <a
            href="/rozpis-mtb-cup-2026.pdf"
            download="Rozpis-MTB-Cup-2026.pdf"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary font-semibold text-sm px-5 py-3 rounded-xl transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.5 1v9M4.5 7l3 3 3-3M1.5 13h12" />
            </svg>
            Rozpis ČP MTB 2026 (PDF)
          </a>
          <a
            href="https://www.poharmtb.cz/mtb-xco-cup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 hover:border-primary/40 hover:text-primary transition-all"
          >
            Český pohár MTB — pravidla seriálu ↗
          </a>
          <a
            href="https://www.poharmtb.cz/files/vseobecna-pravidla-soutezni-rad-mtb-2025-ver-1325.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-3 text-sm font-semibold text-slate-200 hover:border-secondary/40 hover:text-secondary transition-all"
          >
            Soutěžní řád MTB 2025 (PDF) ↗
          </a>
        </div>
      </section>

      {/* Kategorie */}
      <section className="mb-8 sm:mb-14">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-8">
          Závodní kategorie
        </h2>
        <div className="space-y-8">
          {KATEGORIE.map((skupina) => (
            <div key={skupina.skupina}>
              <h3 className={`text-sm font-bold uppercase tracking-[0.25em] ${skupina.color} mb-3`}>
                {skupina.skupina}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {skupina.items.map(([kat, vek]) => (
                  <div
                    key={kat}
                    className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-2.5"
                  >
                    <p className="text-sm font-medium text-slate-200">{kat}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{vek}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registrace */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-6 sm:p-8 text-center">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-3">
          Registrace
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
          Registrace probíhá online na stránkách Českého poháru MTB.
          Celková kapacita <strong className="text-white">650 závodníků</strong>.
        </p>
        <a
          href="https://cycling.sportsoft.cz/mtb/#registrace"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-secondary to-primary text-white font-bold px-8 py-3.5 rounded-xl uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          Registrovat se ↗
        </a>
      </section>
    </div>
  );
}
