"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Track = {
  id: string;
  name: string;
  color: string;
  points: { lat: number; lon: number }[];
};

export default function LeafletMultiMap({
  tracks,
  activeId,
}: {
  tracks: Track[];
  activeId?: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || tracks.length === 0) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const allLatLngs: L.LatLngExpression[] = [];

    tracks.forEach((track) => {
      if (track.points.length < 2) return;
      const isActive = !activeId || activeId === track.id;
      const latLngs: L.LatLngExpression[] = track.points.map((p) => [p.lat, p.lon]);
      latLngs.forEach((ll) => allLatLngs.push(ll));

      const c = track.color?.toLowerCase().trim() ?? "";
      const trackColor =
        !c || c.startsWith("#fff") || c === "white" || c === "rgb(255,255,255)"
          ? "#0d9488"
          : track.color;

      if (isActive) {
        // Outline (tmavý podklad) + barevná čára navrch
        L.polyline(latLngs, { color: "#000000", weight: 9, opacity: 0.35 }).addTo(map);
        L.polyline(latLngs, { color: trackColor, weight: 5, opacity: 1 }).addTo(map);
      } else {
        L.polyline(latLngs, { color: trackColor, weight: 2, opacity: 0.35 }).addTo(map);
      }
    });

    if (allLatLngs.length > 0) {
      map.fitBounds(L.latLngBounds(allLatLngs as L.LatLngTuple[]), { padding: [30, 30] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tracks, activeId]);

  return <div ref={mapRef} className="w-full h-full" />;
}
