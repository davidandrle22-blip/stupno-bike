import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
    include: { race: { select: { title: true } } },
  });
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const video = await prisma.video.create({
    data: {
      url: data.url,
      title: data.title || null,
      thumbnail: data.thumbnail || null,
      featured: data.featured || false,
      raceId: data.raceId || null,
    },
  });
  return NextResponse.json(video);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.video.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
