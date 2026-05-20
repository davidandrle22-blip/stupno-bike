import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
    include: { race: { select: { title: true } } },
  });
  return NextResponse.json(photos);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { url, alt, album, raceId } = body;

  if (!url) return NextResponse.json({ error: "No url" }, { status: 400 });

  const photo = await prisma.photo.create({
    data: {
      url,
      alt: alt || null,
      album: album || null,
      raceId: raceId || null,
    },
    include: { race: { select: { title: true } } },
  });

  return NextResponse.json(photo);
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.photo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
