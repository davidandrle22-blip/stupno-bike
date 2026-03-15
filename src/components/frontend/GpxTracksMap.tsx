"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LeafletMultiMap = dynamic(() => import("./LeafletMultiMap"), { ssr: false });

type Track = {
  id: string;
  name: string;
  color: string;
  points: { lat: number; lon: number }[];
};

type Props = {
  circuits: {
    id: string;
    name: string;
    color: string;
    gpxUrl: string;
  }[];
  activeId?: string;
};

function parseGpxPoints(gpxText: string): { lat: number; lon: number }[] {
  const points: { lat: number; lon: number }[] = [];
  const regex = /<trkpt[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"/g;
  let match;
  while ((match = regex.exec(gpxText)) !== null) {
    points.push({ lat: parseFloat(match[1]), lon: parseFloat(match[2]) });
  }
  return points;
}

export default function GpxTracksMap({ circuits, activeId }: Props) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const results = await Promise.all(
        circuits.map(async (c) => {
          try {
            const res = await fetch(c.gpxUrl);
            const text = await res.text();
            const points = parseGpxPoints(text);
            return { id: c.id, name: c.name, color: c.color, points };
          } catch {
            return { id: c.id, name: c.name, color: c.color, points: [] };
          }
        })
      );
      if (!cancelled) {
        setTracks(results);
        setLoading(false);
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [circuits]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M8 2a6 6 0 1 0 6 6" strokeLinecap="round" />
          </svg>
          Načítám trasy…
        </div>
      </div>
    );
  }

  return <LeafletMultiMap tracks={tracks} activeId={activeId} />;
}
