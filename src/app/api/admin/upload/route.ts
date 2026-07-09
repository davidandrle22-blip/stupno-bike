import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const image = await prisma.uploadedImage.create({
    data: {
      data: Buffer.from(await file.arrayBuffer()),
      mimeType: file.type || "image/jpeg",
    },
  });

  return NextResponse.json({ url: `/api/images/${image.id}` });
}
