"use client";

import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";

type Result = {
  id: string;
  category: string;
  position: number;
  name: string;
  team: string | null;
  time: string | null;
  points: number | null;
};

export default function ResultsManager({
  raceId,
  initialResults,
}: {
  raceId: string;
  initialResults: Result[];
}) {
  const [results, setResults] = useState(initialResults);
  const [saving, setSaving] = useState(false);
  const [newResult, setNewResult] = useState({
    category: "Elite muži",
    position: 1,
    name: "",
    team: "",
    time: "",
    points: 0,
  });

  const categories = [...new Set(results.map((r) => r.category))];

  const addResult = async () => {
    if (!newResult.name) return;
    setSaving(true);
    const res = await fetch("/api/admin/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newResult, raceId }),
    });
    if (res.ok) {
      const created = await res.json();
      setResults([...results, created]);
      setNewResult({
        ...newResult,
        position: newResult.position + 1,
        name: "",
        team: "",
        time: "",
      });
    }
    setSaving(false);
  };

  const deleteResult = async (id: string) => {
    const res = await fetch(`/api/admin/results?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setResults(results.filter((r) => r.id !== id));
    }
  };

  const importCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.trim().split("\n").slice(1); // skip header
    setSaving(true);
    for (const line of lines) {
      const [position, name, team, time, category, points] = line.split(",").map((s) => s.trim());
      if (name) {
        const res = await fetch("/api/admin/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            raceId,
            position: parseInt(position) || 0,
            name,
            team: team || null,
            time: time || null,
            category: category || "Elite muži",
            points: parseInt(points) || null,
          }),
        });
        if (res.ok) {
          const created = await res.json();
          setResults((prev) => [...prev, created]);
        }
      }
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* CSV Import */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
          <Upload size={16} />
          Import CSV (pořadí, jméno, tým, čas, kategorie, body)
          <input
            type="file"
            accept=".csv"
            onChange={importCSV}
            className="hidden"
          />
        </label>
      </div>

      {/* Add result form */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Přidat výsledek</h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <input
            type="number"
            placeholder="Poř."
            value={newResult.position}
            onChange={(e) =>
              setNewResult({ ...newResult, position: parseInt(e.target.value) || 0 })
            }
            className="px-2 py-1.5 border rounded text-sm"
          />
          <input
            placeholder="Jméno *"
            value={newResult.name}
            onChange={(e) =>
              setNewResult({ ...newResult, name: e.target.value })
            }
            className="px-2 py-1.5 border rounded text-sm"
          />
          <input
            placeholder="Tým"
            value={newResult.team}
            onChange={(e) =>
              setNewResult({ ...newResult, team: e.target.value })
            }
            className="px-2 py-1.5 border rounded text-sm"
          />
          <input
            placeholder="Čas"
            value={newResult.time}
            onChange={(e) =>
              setNewResult({ ...newResult, time: e.target.value })
            }
            className="px-2 py-1.5 border rounded text-sm"
          />
          <select
            value={newResult.category}
            onChange={(e) =>
              setNewResult({ ...newResult, category: e.target.value })
            }
            className="px-2 py-1.5 border rounded text-sm"
          >
            <option>Elite muži</option>
            <option>Elite ženy</option>
            <option>U23 muži</option>
            <option>Junioři</option>
            <option>Juniorky</option>
            <option>Kadeti</option>
            <option>Kadetky</option>
          </select>
          <button
            onClick={addResult}
            disabled={saving}
            className="bg-primary hover:bg-primary-dark text-black font-semibold px-3 py-1.5 rounded text-sm flex items-center gap-1 justify-center disabled:opacity-50"
          >
            <Plus size={14} />
            Přidat
          </button>
        </div>
      </div>

      {/* Results table */}
      {categories.length > 0 ? (
        categories.map((cat) => {
          const catResults = results.filter((r) => r.category === cat);
          return (
            <div key={cat} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h3 className="font-semibold text-gray-900">{cat}</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-left">Jméno</th>
                    <th className="px-3 py-2 text-left">Tým</th>
                    <th className="px-3 py-2 text-left">Čas</th>
                    <th className="px-3 py-2 text-left">Body</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {catResults.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-50 text-sm">
                      <td className="px-3 py-2 font-bold">{r.position}</td>
                      <td className="px-3 py-2">{r.name}</td>
                      <td className="px-3 py-2 text-gray-500">{r.team || "—"}</td>
                      <td className="px-3 py-2 font-mono">{r.time || "—"}</td>
                      <td className="px-3 py-2">{r.points || "—"}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => deleteResult(r.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">Zatím žádné výsledky.</p>
      )}
    </div>
  );
}
