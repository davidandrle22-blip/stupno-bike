"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      seriesName: (formData.get("seriesName") as string) || "AC Heating Cup",
      logo: (formData.get("logo") as string) || null,
      registrationUrl: (formData.get("registrationUrl") as string) || null,
      facebookUrl: (formData.get("facebookUrl") as string) || null,
      instagramUrl: (formData.get("instagramUrl") as string) || null,
      contactEmail: (formData.get("contactEmail") as string) || null,
      contactPhone: (formData.get("contactPhone") as string) || null,
      showUciLogo: formData.get("showUciLogo") === "on",
    },
    create: {
      id: "main",
      seriesName: (formData.get("seriesName") as string) || "AC Heating Cup",
    },
  });

  revalidatePath("/admin/nastaveni");
  revalidatePath("/");
}

export async function updatePage(id: string, formData: FormData) {
  await prisma.page.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || "",
      heroImage: (formData.get("heroImage") as string) || null,
    },
  });

  revalidatePath("/admin/stranky");
  revalidatePath("/");
}
