"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Point = { lat: number; lon: number; ele: number };

export default function LeafletMap({
  points,
  color,
}: {
  points: Point[];
  color: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || points.length === 0) return;

    // Clean up previous instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current);
    mapInstanceRef.current = map;

    // Mapy.cz tourist tiles
    L.tileLayer("https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}", {
      attribution:
        '&copy; <a href="https://www.seznam.cz">Seznam.cz</a>, &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // Add GPX polyline — vždy výrazná barva, fallback na teal
    const c = color?.toLowerCase().trim() ?? "";
    const effectiveColor =
      !c || c.startsWith("#fff") || c === "white" || c === "rgb(255,255,255)"
        ? "#0d9488"
        : color;
    const latLngs: L.LatLngExpression[] = points.map((p) => [p.lat, p.lon]);
    // Outline + barevná čára navrch pro maximální viditelnost
    L.polyline(latLngs, { color: "#000000", weight: 9, opacity: 0.35 }).addTo(map);
    const polyline = L.polyline(latLngs, {
      color: effectiveColor,
      weight: 5,
      opacity: 1,
    }).addTo(map);

    // Fit bounds
    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [points, color]);

  return <div ref={mapRef} className="w-full h-full" />;
}
