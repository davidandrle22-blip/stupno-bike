"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const GpxTracksMap = dynamic(
  () => import("@/components/frontend/GpxTracksMap"),
  { ssr: false }
);

type Circuit = {
  id: string;
  name: string;
  categories: string;
  difficulty: string;
  length: string;
  elevation: string;
  color: string;
  gpx: string;
  profile: string;
};

const CIRCUITS: Circuit[] = [
  {
    id: "bila",
    name: "Bílá trasa",
    categories: "Děti 6 let",
    difficulty: "Nejkratší okruh pro nejmenší závodníky",
    length: "cca 0,5 km",
    elevation: "~10 m",
    color: "#e2e8f0",
    gpx: "/gpx/okruh-bily.gpx",
    profile: "0,52 60,46 120,42 180,46 240,44 300,52",
  },
  {
    id: "cervena",
    name: "Červená trasa",
    categories: "Děti 7–10 let",
    difficulty: "Okruh pro mladé závodníky",
    length: "cca 1,2 km",
    elevation: "~25 m",
    color: "#ef4444",
    gpx: "/gpx/okruh-cerveny.gpx",
    profile:
      "0,52 40,42 80,34 120,40 160,28 200,38 240,32 280,42 300,52",
  },
  {
    id: "modra",
    name: "Modrá trasa",
    categories: "Žáci a žákyně",
    difficulty: "Závodní okruh pro žákovské kategorie",
    length: "cca 2,5 km",
    elevation: "~50 m",
    color: "#38bdf8",
    gpx: "/gpx/okruh-modry.gpx",
    profile:
      "0,52 30,38 60,44 90,22 120,35 150,14 180,28 210,10 240,22 270,34 300,52",
  },
  {
    id: "zluta",
    name: "Žlutá trasa",
    categories: "Kadeti, kadetky, junioři, juniorky, ELITE muži a ženy",
    difficulty: "Hlavní závodní okruh MČR XCO — technický terén",
    length: "4,2 km",
    elevation: "~85 m",
    color: "#fbbf24",
    gpx: "/gpx/okruh-zluty.gpx",
    profile:
      "0,52 18,38 36,44 54,22 72,35 90,14 108,28 126,10 144,20 162,32 180,8 198,18 216,30 234,12 252,22 270,38 288,18 300,52",
  },
];

const MAP_CIRCUITS = CIRCUITS.map((c) => ({
  id: c.id,
  name: c.name,
  color: c.color,
  gpxUrl: c.gpx,
}));

function ElevationSVG({ circuit }: { circuit: Circuit }) {
  const gradId = `elev-${circuit.id}`;
  const fillPoints = `0,60 ${circuit.profile} 300,60`;

  return (
    <svg
      viewBox="0 0 300 60"
      className="w-full h-10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={circuit.color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={circuit.color} stopOpacity={0.03} />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#${gradId})`} />
      <polyline
        points={circuit.profile}
        fill="none"
        stroke={circuit.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
    </svg>
  );
}

export default function OkruhyPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  function showOnMap(id: string) {
    setActiveId(id);
    document.getElementById("mapa-okruhu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      {/* Hlavička sekce */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-3">
          Závodní okruhy
        </h2>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          Areál Ultramarinka v Břasích nabízí čtyři MTB okruhy pro různé věkové kategorie.
          Hlavní závodní okruh (4,2 km) je určen pro kadety, juniory a elitu bojující o tituly MČR.
          Stáhněte si GPX soubory nebo si trasy zobrazte přímo na mapě níže.
        </p>
      </div>

      {/* Karty tras — 2×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {CIRCUITS.map((circuit) => {
          const isActive = activeId === circuit.id;
          return (
            <div
              key={circuit.id}
              className={`rounded-2xl bg-slate-900 overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 ${
                isActive
                  ? "border-slate-400 shadow-lg"
                  : "border-slate-700/60 hover:border-slate-500"
              }`}
            >
              {/* Barevný horní proužek */}
              <div className="h-1" style={{ backgroundColor: circuit.color }} />

              <div className="p-5">
                {/* Badge + název */}
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2"
                    style={{
                      backgroundColor: `${circuit.color}1a`,
                      color: circuit.color,
                      border: `1px solid ${circuit.color}40`,
                    }}
                  >
                    {circuit.name}
                  </span>
                  <p className="text-white font-bold text-base leading-tight">
                    {circuit.categories}
                  </p>
                  <p className="text-slate-400 text-sm mt-0.5">{circuit.difficulty}</p>
                </div>

                {/* Statistiky */}
                <div className="flex gap-3 sm:gap-6 mb-4">
                  <div>
                    <p className="text-white text-xl sm:text-2xl font-extrabold leading-none">
                      {circuit.length}
                    </p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">
                      ↔ Délka
                    </p>
                  </div>
                  <div>
                    <p className="text-white text-xl sm:text-2xl font-extrabold leading-none">
                      {circuit.elevation}
                    </p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">
                      ▲ Převýšení
                    </p>
                  </div>
                </div>

                {/* Výškový profil */}
                <div className="mb-4 rounded-lg bg-slate-800/60 px-2 pt-2 pb-1 overflow-hidden">
                  <ElevationSVG circuit={circuit} />
                </div>

                {/* Akční tlačítka */}
                <div className="flex gap-2">
                  <a
                    href={circuit.gpx}
                    download
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border transition-colors hover:opacity-90"
                    style={{
                      borderColor: `${circuit.color}50`,
                      color: circuit.color,
                      backgroundColor: `${circuit.color}0d`,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 1v7M3 5l3 3 3-3M1 10h10" />
                    </svg>
                    Stáhnout GPX
                  </a>
                  <button
                    onClick={() => showOnMap(circuit.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors"
                    style={{
                      backgroundColor: isActive ? `${circuit.color}20` : "#334155",
                      color: isActive ? circuit.color : "#fff",
                      border: isActive ? `1px solid ${circuit.color}50` : "1px solid transparent",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 1.5C4 1.5 2.5 3 2.5 5c0 2.5 3.5 5.5 3.5 5.5S9.5 7.5 9.5 5c0-2-1.5-3.5-3.5-3.5z" />
                      <circle cx="6" cy="5" r="1.2" />
                    </svg>
                    Zobrazit na mapě
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mapa okruhů — plné zobrazení + PDF stažení */}
      <div className="mb-10">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/30">
          <img
            src="/images/mapa-okruhu.png"
            alt="Mapa závodních okruhů Stupno XC — plné rozlišení"
            className="w-full h-auto block"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="/mapa-okruhu.pdf"
            download="Mapa-okruhu-Stupno-XCO.pdf"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 1v9M5 7l3 3 3-3M2 13h12" />
            </svg>
            Stáhnout mapu v plném rozlišení (PDF)
          </a>
          <span className="text-slate-500 text-xs">Formát PDF, tisk A3/A2</span>
        </div>
      </div>

      {/* Interaktivní mapa s GPX trasami */}
      <div id="mapa-okruhu" className="rounded-2xl overflow-hidden border border-gray-border shadow-lg">
        <div className="bg-slate-800 px-5 py-3.5 flex items-center gap-2.5 flex-wrap">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" />
            <circle cx="8" cy="6" r="1.5" />
          </svg>
          <span className="text-white text-sm font-semibold uppercase tracking-wide">
            {activeId
              ? CIRCUITS.find((c) => c.id === activeId)?.name ?? "Mapa tras"
              : "Všechny trasy"}
          </span>

          {/* Přepínač tras */}
          <div className="flex gap-1.5 ml-2 flex-wrap">
            <button
              onClick={() => setActiveId(null)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                activeId === null
                  ? "bg-teal-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Vše
            </button>
            {CIRCUITS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className="px-2.5 py-1 rounded-md text-xs font-semibold transition-all"
                style={{
                  backgroundColor: activeId === c.id ? `${c.color}30` : "#334155",
                  color: activeId === c.id ? c.color : "#94a3b8",
                  border: activeId === c.id ? `1px solid ${c.color}60` : "1px solid transparent",
                }}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <a
            href="https://mapy.cz/turisticka?x=13.583&y=49.832&z=15"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-teal-400 hover:text-teal-300 text-xs uppercase tracking-wide font-medium transition-colors shrink-0"
          >
            Mapy.cz →
          </a>
        </div>

        <div className="h-[280px] sm:h-[380px] lg:h-[450px]">
          <GpxTracksMap
            circuits={MAP_CIRCUITS}
            activeId={activeId ?? undefined}
          />
        </div>
      </div>

      {/* Info pod mapou */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="5.5" />
            <path d="M7 4v3.5l2 1.5" strokeLinecap="round" />
          </svg>
          GPX soubory jsou kompatibilní s Garmin, Wahoo, Komoot a dalšími GPS aplikacemi.
        </div>
        <Link
          href="/zavod/stupno/propozice"
          className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Propozice závodu →
        </Link>
      </div>
    </div>
  );
}
