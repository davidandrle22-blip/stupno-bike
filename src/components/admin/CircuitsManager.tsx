"use client";

import { useState, useRef } from "react";
import { Trash2, Upload, MapPin } from "lucide-react";

type Circuit = {
  id: string;
  name: string;
  categories: string | null;
  gpxFile: string;
  gpxData: string | null;
  color: string;
  order: number;
};

export default function CircuitsManager({
  raceId,
  initialCircuits,
}: {
  raceId: string;
  initialCircuits: Circuit[];
}) {
  const [circuits, setCircuits] = useState(initialCircuits);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [color, setColor] = useState("#FF6B35");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !name) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("raceId", raceId);
    formData.append("name", name);
    formData.append("categories", categories);
    formData.append("color", color);

    const res = await fetch("/api/admin/circuits", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const circuit = await res.json();
      setCircuits([...circuits, circuit]);
      setName("");
      setCategories("");
      if (fileRef.current) fileRef.current.value = "";
    }
    setUploading(false);
  };

  const deleteCircuit = async (id: string) => {
    const res = await fetch(`/api/admin/circuits?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCircuits(circuits.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload form */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Nahrát GPX okruh</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název okruhu *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hlavní okruh Elite"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategorie
            </label>
            <input
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Elite muži, Elite ženy"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPX soubor *
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".gpx"
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Barva trasy
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-20"
            />
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading || !name}
          className="bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? "Nahrávání..." : "Nahrát okruh"}
        </button>
      </div>

      {/* Circuits list */}
      {circuits.length > 0 ? (
        <div className="space-y-3">
          {circuits.map((circuit) => {
            let stats = null;
            if (circuit.gpxData) {
              try {
                stats = JSON.parse(circuit.gpxData);
              } catch {
                /* ignore */
              }
            }

            return (
              <div
                key={circuit.id}
                className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4"
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: circuit.color }}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {circuit.name}
                  </h4>
                  {circuit.categories && (
                    <p className="text-sm text-gray-500">
                      {circuit.categories}
                    </p>
                  )}
                  {stats && (
                    <p className="text-xs text-gray-400 mt-1">
                      {(stats.distance / 1000).toFixed(1)} km &bull;{" "}
                      {Math.round(stats.elevationGain)}m stoupání &bull;{" "}
                      {stats.points?.length || 0} bodů
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteCircuit(circuit.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 flex items-center gap-2">
          <MapPin size={16} />
          Zatím žádné okruhy. Nahrajte GPX soubor výše.
        </p>
      )}
    </div>
  );
}
