import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = await prisma.result.create({
    data: {
      raceId: data.raceId,
      category: data.category,
      position: data.position,
      name: data.name,
      team: data.team || null,
      time: data.time || null,
      points: data.points || null,
    },
  });
  return NextResponse.json(result);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await prisma.result.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
