"use client";

import { useState } from "react";
import { Trash2, Plus, Star } from "lucide-react";

type Video = {
  id: string;
  url: string;
  title: string | null;
  featured: boolean;
  raceId: string | null;
  race: { id: string; title: string } | null;
};

type Race = { id: string; title: string };

export default function VideosManager({
  initialVideos,
  races,
}: {
  initialVideos: Video[];
  races: Race[];
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [raceId, setRaceId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const addVideo = async () => {
    if (!url) return;
    setSaving(true);
    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        title: title || null,
        raceId: raceId || null,
        featured,
      }),
    });
    if (res.ok) {
      const video = await res.json();
      setVideos([video, ...videos]);
      setUrl("");
      setTitle("");
    }
    setSaving(false);
  };

  const deleteVideo = async (id: string) => {
    const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setVideos(videos.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
        <h3 className="font-semibold text-gray-900">Přidat video</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="YouTube/Vimeo URL *"
            className="px-3 py-2 border rounded-lg"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titulek"
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={raceId}
            onChange={(e) => setRaceId(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Bez přiřazení</option>
            {races.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 px-3 py-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="text-sm">Featured (homepage)</span>
          </label>
        </div>
        <button
          onClick={addVideo}
          disabled={saving || !url}
          className="bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={16} />
          Přidat
        </button>
      </div>

      <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {video.title || video.url}
              </p>
              <p className="text-sm text-gray-500 truncate">{video.url}</p>
              <div className="flex gap-2 mt-1">
                {video.race && (
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {video.race.title}
                  </span>
                )}
                {video.featured && (
                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded flex items-center gap-1">
                    <Star size={10} /> Featured
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteVideo(video.id)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
