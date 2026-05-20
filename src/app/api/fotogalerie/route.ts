import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, url: true, alt: true, album: true },
  });
  return NextResponse.json(photos);
}
