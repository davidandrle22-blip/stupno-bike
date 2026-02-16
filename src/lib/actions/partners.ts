"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPartner(formData: FormData) {
  await prisma.partner.create({
    data: {
      name: formData.get("name") as string,
      logo: (formData.get("logo") as string) || "/uploads/partners/placeholder.svg",
      url: (formData.get("url") as string) || null,
      type: (formData.get("type") as string) || "SERIES",
      order: parseInt(formData.get("order") as string) || 0,
    },
  });

  revalidatePath("/admin/partneri");
  revalidatePath("/");
  redirect("/admin/partneri");
}

export async function updatePartner(id: string, formData: FormData) {
  await prisma.partner.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      logo: (formData.get("logo") as string) || "/uploads/partners/placeholder.svg",
      url: (formData.get("url") as string) || null,
      type: (formData.get("type") as string) || "SERIES",
      order: parseInt(formData.get("order") as string) || 0,
    },
  });

  revalidatePath("/admin/partneri");
  revalidatePath("/");
  redirect("/admin/partneri");
}

export async function deletePartner(id: string) {
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partneri");
  revalidatePath("/");
}
