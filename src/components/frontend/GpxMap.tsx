"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

type GpxPoint = { lat: number; lon: number; ele: number };
type GpxParsed = {
  points: GpxPoint[];
  distance: number;
  elevationGain: number;
  elevationLoss: number;
  minEle: number;
  maxEle: number;
};

type CircuitData = {
  id: string;
  name: string;
  categories: string | null;
  color: string;
  gpxData: string | null;
};

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import("./LeafletMap"), { ssr: false });

function ElevationProfile({
  points,
  color,
}: {
  points: GpxPoint[];
  color: string;
}) {
  if (points.length < 2) return null;

  const width = 800;
  const height = 200;
  const padding = 40;

  const eles = points.map((p) => p.ele);
  const minEle = Math.min(...eles);
  const maxEle = Math.max(...eles);
  const eleRange = maxEle - minEle || 1;

  // Calculate cumulative distances
  const distances: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    const dLat = points[i].lat - points[i - 1].lat;
    const dLon = points[i].lon - points[i - 1].lon;
    const d = Math.sqrt(dLat * dLat + dLon * dLon) * 111000;
    distances.push(distances[i - 1] + d);
  }
  const totalDist = distances[distances.length - 1] || 1;

  const pathPoints = points.map((p, i) => {
    const x = padding + (distances[i] / totalDist) * (width - 2 * padding);
    const y =
      height - padding - ((p.ele - minEle) / eleRange) * (height - 2 * padding);
    return `${x},${y}`;
  });

  const fillPoints = [
    `${padding},${height - padding}`,
    ...pathPoints,
    `${width - padding},${height - padding}`,
  ];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <polygon points={fillPoints.join(" ")} fill={color} opacity={0.15} />
      <polyline
        points={pathPoints.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
      {/* Y axis labels */}
      <text x={padding - 5} y={padding} fontSize={10} textAnchor="end" fill="#666">
        {Math.round(maxEle)} m
      </text>
      <text
        x={padding - 5}
        y={height - padding}
        fontSize={10}
        textAnchor="end"
        fill="#666"
      >
        {Math.round(minEle)} m
      </text>
      {/* X axis labels */}
      <text
        x={padding}
        y={height - padding + 15}
        fontSize={10}
        textAnchor="start"
        fill="#666"
      >
        0 km
      </text>
      <text
        x={width - padding}
        y={height - padding + 15}
        fontSize={10}
        textAnchor="end"
        fill="#666"
      >
        {(totalDist / 1000).toFixed(1)} km
      </text>
    </svg>
  );
}

export default function GpxMap({ circuits }: { circuits: CircuitData[] }) {
  const [activeCircuit, setActiveCircuit] = useState(circuits[0]?.id || "");

  const circuit = circuits.find((c) => c.id === activeCircuit);
  let parsed: GpxParsed | null = null;
  if (circuit?.gpxData) {
    try {
      parsed = JSON.parse(circuit.gpxData);
    } catch {
      parsed = null;
    }
  }

  return (
    <div>
      {/* Circuit selector */}
      {circuits.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {circuits.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCircuit(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeCircuit === c.id
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={
                activeCircuit === c.id
                  ? { backgroundColor: c.color }
                  : undefined
              }
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {circuit && parsed && parsed.points.length > 0 ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-2xl font-bold text-dark">
                {(parsed.distance / 1000).toFixed(1)} km
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Délka
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-2xl font-bold text-dark">
                {Math.round(parsed.elevationGain)} m
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Stoupání
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-2xl font-bold text-dark">
                {Math.round(parsed.minEle)} m
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Min výška
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-2xl font-bold text-dark">
                {Math.round(parsed.maxEle)} m
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Max výška
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg mb-4 h-[400px]">
            <MapComponent
              points={parsed.points}
              color={circuit.color}
            />
          </div>

          {/* Elevation profile */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="text-sm font-bold text-dark uppercase tracking-wide mb-2">
              Výškový profil
            </h3>
            <ElevationProfile points={parsed.points} color={circuit.color} />
          </div>

          {/* Circuit info */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-bold">{circuit.name}</span>
              {circuit.categories && ` — ${circuit.categories}`}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">
          Data okruhu nejsou k dispozici.
        </p>
      )}
    </div>
  );
}
