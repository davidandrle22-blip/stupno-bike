"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.article.create({
    data: {
      title,
      slug: slugify(title),
      content: (formData.get("content") as string) || "",
      excerpt: (formData.get("excerpt") as string) || null,
      featuredImage: (formData.get("featuredImage") as string) || null,
      tags: (formData.get("tags") as string) || null,
      status: (formData.get("status") as string) || "DRAFT",
      publishedAt: formData.get("publishedAt")
        ? new Date(formData.get("publishedAt") as string)
        : null,
    },
  });

  revalidatePath("/admin/clanky");
  revalidatePath("/novinky");
  redirect("/admin/clanky");
}

export async function updateArticle(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      content: (formData.get("content") as string) || "",
      excerpt: (formData.get("excerpt") as string) || null,
      featuredImage: (formData.get("featuredImage") as string) || null,
      tags: (formData.get("tags") as string) || null,
      status: (formData.get("status") as string) || "DRAFT",
      publishedAt: formData.get("publishedAt")
        ? new Date(formData.get("publishedAt") as string)
        : null,
    },
  });

  revalidatePath("/admin/clanky");
  revalidatePath("/novinky");
  redirect("/admin/clanky");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/clanky");
  revalidatePath("/novinky");
}
