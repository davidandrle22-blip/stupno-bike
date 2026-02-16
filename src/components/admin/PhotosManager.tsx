"use client";

import { useState, useRef } from "react";
import { Trash2, Upload } from "lucide-react";

type Photo = {
  id: string;
  url: string;
  alt: string | null;
  raceId: string | null;
  race: { id: string; title: string } | null;
};

type Race = { id: string; title: string };

export default function PhotosManager({
  initialPhotos,
  races,
}: {
  initialPhotos: Photo[];
  races: Race[];
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [selectedRace, setSelectedRace] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const files = fileRef.current?.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      if (selectedRace) formData.append("raceId", selectedRace);
      formData.append("alt", file.name);

      const res = await fetch("/api/admin/photos", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const photo = await res.json();
        setPhotos((prev) => [photo, ...prev]);
      }
    }
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
  };

  const deletePhoto = async (id: string) => {
    const res = await fetch(`/api/admin/photos?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setPhotos(photos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Nahrát fotky</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Přiřadit k závodu
            </label>
            <select
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">Obecná galerie</option>
              {races.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="text-sm"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Upload size={16} />
            {uploading ? "Nahrávání..." : "Nahrát"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group bg-white rounded-lg overflow-hidden shadow-sm border"
          >
            <img
              src={photo.url}
              alt={photo.alt || ""}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <p className="text-xs text-gray-500 truncate">
                {photo.race?.title || "Obecná"}
              </p>
            </div>
            <button
              onClick={() => deletePhoto(photo.id)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-gray-500 text-center py-8">Žádné fotky.</p>
      )}
    </div>
  );
}
