"use client";

import { useState } from "react";

type Result = {
  id: string;
  category: string;
  position: number;
  name: string;
  team: string | null;
  time: string | null;
  points: number | null;
};

type RaceResults = {
  id: string;
  title: string;
  slug: string;
  results: Result[];
};

export default function ResultsTable({ races }: { races: RaceResults[] }) {
  const [selectedRace, setSelectedRace] = useState(races[0]?.id || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const race = races.find((r) => r.id === selectedRace);
  const categories = race
    ? [...new Set(race.results.map((r) => r.category))]
    : [];
  const activeCategory = selectedCategory || categories[0] || "";
  const filteredResults =
    race?.results.filter((r) => r.category === activeCategory) || [];

  return (
    <div>
      {/* Race selector */}
      {races.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {races.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedRace(r.id);
                setSelectedCategory("");
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide transition-all ${
                selectedRace === r.id
                  ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/20"
                  : "bg-white/[0.08] text-slate-400 hover:bg-white/[0.12] border border-white/[0.1]"
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      )}

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-secondary text-white shadow-sm shadow-secondary/20"
                  : "bg-white/[0.08] text-slate-400 hover:bg-white/[0.12] border border-white/[0.1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results table */}
      {filteredResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.08]">
            <thead>
              <tr className="bg-white/[0.06] text-white">
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider w-16">
                  #
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Jméno
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Tým
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider w-24">
                  Čas
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider w-20">
                  Body
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, i) => (
                <tr
                  key={result.id}
                  className={`border-b border-white/[0.05] ${
                    i < 3 ? "bg-primary/[0.05]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <span
                      className={`font-black text-lg ${
                        result.position === 1
                          ? "text-primary"
                          : result.position === 2
                          ? "text-secondary"
                          : result.position === 3
                          ? "text-accent"
                          : "text-slate-500"
                      }`}
                    >
                      {result.position}.
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-white">
                    {result.name}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 text-sm">
                    {result.team || "—"}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-slate-300">
                    {result.time || "—"}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-primary">
                    {result.points || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-400">
          Pro tuto kategorii nejsou zatím výsledky.
        </p>
      )}
    </div>
  );
}
