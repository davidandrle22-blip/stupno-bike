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
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
          <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <thead>
              <tr className="bg-dark text-white">
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
                  className={`border-b border-gray-50 ${
                    i < 3 ? "bg-primary/[0.03]" : "hover:bg-gray-50"
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
                          : "text-gray-300"
                      }`}
                    >
                      {result.position}.
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-dark">
                    {result.name}
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 text-sm">
                    {result.team || "—"}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-gray-600">
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
        <p className="text-gray-500">
          Pro tuto kategorii nejsou zatím výsledky.
        </p>
      )}
    </div>
  );
}
