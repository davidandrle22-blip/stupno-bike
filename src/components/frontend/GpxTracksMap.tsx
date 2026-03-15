"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

type TrackData = {
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

function LeafletMapInner({
  tracks,
  activeId,
}: {
  tracks: TrackData[];
  activeId?: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || tracks.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    require("leaflet/dist/leaflet.css");

    if (mapInstanceRef.current) {
      (mapInstanceRef.current as { remove: () => void }).remove();
    }

    const map = L.map(mapRef.current);
    mapInstanceRef.current = map;

    L.tileLayer("https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}", {
      attribution:
        '&copy; <a href="https://www.seznam.cz">Seznam.cz</a>, &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const allLatLngs: [number, number][] = [];

    tracks.forEach((track) => {
      if (track.points.length < 2) return;
      const isActive = !activeId || activeId === track.id;
      const latLngs: [number, number][] = track.points.map((p) => [p.lat, p.lon]);
      latLngs.forEach((ll) => allLatLngs.push(ll));

      L.polyline(latLngs, {
        color: track.color,
        weight: isActive ? 4 : 2,
        opacity: isActive ? 0.9 : 0.35,
      }).addTo(map);
    });

    if (allLatLngs.length > 0) {
      map.fitBounds(allLatLngs, { padding: [30, 30] });
    }

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tracks, activeId]);

  return <div ref={mapRef} className="w-full h-full" />;
}

const LeafletMapDynamic = dynamic(
  () => Promise.resolve(LeafletMapInner),
  { ssr: false }
);

export default function GpxTracksMap({ circuits, activeId }: Props) {
  const [tracks, setTracks] = useState<TrackData[]>([]);
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
    return () => { cancelled = true; };
  }, [circuits]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-xl">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M8 2a6 6 0 1 0 6 6" strokeLinecap="round" />
          </svg>
          Načítám trasy…
        </div>
      </div>
    );
  }

  return <LeafletMapDynamic tracks={tracks} activeId={activeId} />;
}
