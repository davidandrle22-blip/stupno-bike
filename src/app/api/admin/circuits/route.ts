import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

function parseGpx(gpxText: string) {
  const points: { lat: number; lon: number; ele: number }[] = [];

  // Simple regex-based GPX parser
  const trkptRegex = /<trkpt[^>]*lat="([^"]*)"[^>]*lon="([^"]*)"[^>]*>([\s\S]*?)<\/trkpt>/g;
  let match;
  while ((match = trkptRegex.exec(gpxText)) !== null) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    const eleMatch = match[3].match(/<ele>([^<]*)<\/ele>/);
    const ele = eleMatch ? parseFloat(eleMatch[1]) : 0;
    points.push({ lat, lon, ele });
  }

  if (points.length === 0) return null;

  // Calculate stats
  let distance = 0;
  let elevationGain = 0;
  let elevationLoss = 0;

  for (let i = 1; i < points.length; i++) {
    const dLat = (points[i].lat - points[i - 1].lat) * (Math.PI / 180);
    const dLon = (points[i].lon - points[i - 1].lon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(points[i - 1].lat * (Math.PI / 180)) *
        Math.cos(points[i].lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance += 6371000 * c;

    const dEle = points[i].ele - points[i - 1].ele;
    if (dEle > 0) elevationGain += dEle;
    else elevationLoss += Math.abs(dEle);
  }

  const eles = points.map((p) => p.ele);

  return {
    points,
    distance,
    elevationGain,
    elevationLoss,
    minEle: Math.min(...eles),
    maxEle: Math.max(...eles),
  };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const raceId = formData.get("raceId") as string;
  const name = formData.get("name") as string;
  const categories = formData.get("categories") as string | null;
  const color = (formData.get("color") as string) || "#FF6B35";

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  // Save GPX file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads", "gpx");
  await mkdir(uploadDir, { recursive: true });
  const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = path.join(uploadDir, uniqueName);
  await writeFile(filePath, buffer);
  const gpxFileUrl = `/uploads/gpx/${uniqueName}`;

  // Parse GPX
  const gpxText = buffer.toString("utf-8");
  const gpxData = parseGpx(gpxText);

  const circuit = await prisma.circuit.create({
    data: {
      raceId,
      name: name || "Okruh",
      categories: categories || null,
      gpxFile: gpxFileUrl,
      gpxData: gpxData ? JSON.stringify(gpxData) : null,
      color,
    },
  });

  return NextResponse.json(circuit);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.circuit.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
