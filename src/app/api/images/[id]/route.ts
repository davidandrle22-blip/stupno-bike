import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const image = await prisma.uploadedImage.findUnique({ where: { id } });
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
