"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, X, ChevronRight } from "lucide-react";

type Photo = {
  id: string;
  url: string;
  alt: string | null;
  album: string | null;
};

export default function FotogaleriePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  useEffect(() => {
    fetch("/api/fotogalerie")
      .then(r => r.json())
      .then(data => { setPhotos(data); setLoading(false); });
  }, []);

  const grouped = photos.reduce<Record<string, Photo[]>>((acc, p) => {
    const key = p.album || "Obecná galerie";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const albums = Object.keys(grouped);
  const currentAlbum = activeAlbum ?? albums[0] ?? null;
  const currentPhotos = currentAlbum ? (grouped[currentAlbum] ?? []) : [];

  // Lightbox keyboard nav
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(l => l && l.index < l.photos.length - 1 ? { ...l, index: l.index + 1 } : l);
      if (e.key === "ArrowLeft") setLightbox(l => l && l.index > 0 ? { ...l, index: l.index - 1 } : l);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight mb-8">
        Fotogalerie
      </h1>

      {loading ? (
        <p className="text-slate-400">Načítám…</p>
      ) : albums.length === 0 ? (
        <p className="text-slate-400">Fotky budou brzy přidány.</p>
      ) : (
        <>
          {/* Album tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {albums.map(name => (
              <button
                key={name}
                onClick={() => setActiveAlbum(name)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  (activeAlbum ?? albums[0]) === name
                    ? "bg-primary text-white"
                    : "bg-white/[0.06] text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {name}
                <span className="ml-1.5 text-xs opacity-60">({grouped[name].length})</span>
              </button>
            ))}
          </div>

          {/* Photo grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {currentPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group"
                onClick={() => setLightbox({ photos: currentPhotos, index: i })}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || ""}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center z-10"
          >
            <X size={20} />
          </button>

          {lightbox.index > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(l => l ? { ...l, index: l.index - 1 } : l); }}
              className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <img
            src={lightbox.photos[lightbox.index].url}
            alt={lightbox.photos[lightbox.index].alt || ""}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />

          {lightbox.index < lightbox.photos.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(l => l ? { ...l, index: l.index + 1 } : l); }}
              className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <p className="absolute bottom-4 text-white/50 text-sm">
            {lightbox.index + 1} / {lightbox.photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
