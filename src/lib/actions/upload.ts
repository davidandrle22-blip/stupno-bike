"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadFile(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No file uploaded");

  const subfolder = (formData.get("subfolder") as string) || "photos";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", subfolder);
  await mkdir(uploadDir, { recursive: true });

  const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = path.join(uploadDir, uniqueName);
  await writeFile(filePath, buffer);

  return `/uploads/${subfolder}/${uniqueName}`;
}
