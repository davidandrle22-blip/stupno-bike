"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { Trash2, Upload, FolderOpen } from "lucide-react";

type Photo = {
  id: string;
  url: string;
  alt: string | null;
  album: string | null;
  raceId: string | null;
  race: { title: string } | null;
};

type Race = { id: string; title: string };

async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const maxW = 1400;
  const scale = bitmap.width > maxW ? maxW / bitmap.width : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/jpeg", 0.82);
  });
}

export default function PhotosManager({
  initialPhotos,
  races,
}: {
  initialPhotos: Photo[];
  races: Race[];
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [album, setAlbum] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const files = fileRef.current?.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const fileArr = Array.from(files);

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      setUploadProgress(`${i + 1} / ${fileArr.length}`);

      try {
        const compressed = await compressImage(file);
        const blob = await upload(`photos/${Date.now()}-${file.name}`, compressed, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });
        const url = blob.url;

        const albumName = album.trim() || (selectedRace ? races.find(r => r.id === selectedRace)?.title : "") || "Obecná galerie";

        const res = await fetch("/api/admin/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            alt: file.name.replace(/\.[^.]+$/, ""),
            album: albumName,
            raceId: selectedRace || null,
          }),
        });

        if (res.ok) {
          const photo = await res.json();
          setPhotos((prev) => [photo, ...prev]);
        }
      } catch (e) {
        console.error("Upload failed for", file.name, e);
      }
    }

    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
    setUploadProgress("");
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Smazat fotku?")) return;
    const res = await fetch(`/api/admin/photos?id=${id}`, { method: "DELETE" });
    if (res.ok) setPhotos(photos.filter((p) => p.id !== id));
  };

  // Group by album
  const grouped = photos.reduce<Record<string, Photo[]>>((acc, p) => {
    const key = p.album || "Obecná galerie";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Upload panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Nahrát fotky</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Album (název)</label>
            <input
              type="text"
              value={album}
              onChange={e => setAlbum(e.target.value)}
              placeholder="např. Stupno 2026"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Přiřadit k závodu</label>
            <select
              value={selectedRace}
              onChange={e => setSelectedRace(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">— žádný závod —</option>
              {races.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Soubory</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="w-full text-sm text-gray-700 border border-gray-400 rounded-lg px-2 py-1.5 cursor-pointer"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
          >
            <Upload size={16} />
            {uploading ? `Nahrávám ${uploadProgress}…` : "Nahrát"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Fotky se automaticky zkomprimují. Lze vybrat více souborů najednou.</p>
      </div>

      {/* Albums */}
      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500 text-center py-12">Žádné fotky. Nahrajte první album výše.</p>
      ) : (
        Object.entries(grouped).map(([albumName, albumPhotos]) => (
          <div key={albumName}>
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen size={18} className="text-blue-500" />
              <h3 className="font-semibold text-gray-800">{albumName}</h3>
              <span className="text-xs text-gray-400">({albumPhotos.length} fotek)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {albumPhotos.map(photo => (
                <div key={photo.id} className="relative group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <img src={photo.url} alt={photo.alt || ""} loading="lazy" className="w-full h-28 object-cover" />
                  <div className="px-2 py-1">
                    <p className="text-[11px] text-gray-500 truncate">{photo.alt || "—"}</p>
                  </div>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Smazat"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
