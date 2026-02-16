import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
    include: { race: { select: { title: true } } },
  });
  return NextResponse.json(photos);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const raceId = formData.get("raceId") as string | null;
  const alt = formData.get("alt") as string | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads", "photos");
  await mkdir(uploadDir, { recursive: true });
  const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = path.join(uploadDir, uniqueName);
  await writeFile(filePath, buffer);
  const url = `/uploads/photos/${uniqueName}`;

  const photo = await prisma.photo.create({
    data: {
      url,
      alt: alt || file.name,
      raceId: raceId || null,
    },
  });

  return NextResponse.json(photo);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.photo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
