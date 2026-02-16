"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRace(formData: FormData) {
  const title = formData.get("title") as string;
  const race = await prisma.race.create({
    data: {
      title,
      slug: slugify(title),
      date: new Date(formData.get("date") as string),
      dateEnd: formData.get("dateEnd")
        ? new Date(formData.get("dateEnd") as string)
        : null,
      location: formData.get("location") as string,
      uciCategory: (formData.get("uciCategory") as string) || null,
      description: (formData.get("description") as string) || null,
      program: (formData.get("program") as string) || null,
      parking: (formData.get("parking") as string) || null,
      organizer: (formData.get("organizer") as string) || null,
      registrationUrl: (formData.get("registrationUrl") as string) || null,
      navOrder: parseInt(formData.get("navOrder") as string) || 0,
      status: (formData.get("status") as string) || "DRAFT",
      heroImage: (formData.get("heroImage") as string) || null,
      heroVideo: (formData.get("heroVideo") as string) || null,
      heroVideoWebm: (formData.get("heroVideoWebm") as string) || null,
      showHeroVideo: formData.get("showHeroVideo") === "on",
      parkingImage: (formData.get("parkingImage") as string) || null,
    },
  });

  revalidatePath("/admin/zavody");
  revalidatePath("/");
  redirect("/admin/zavody");
}

export async function updateRace(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.race.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      date: new Date(formData.get("date") as string),
      dateEnd: formData.get("dateEnd")
        ? new Date(formData.get("dateEnd") as string)
        : null,
      location: formData.get("location") as string,
      uciCategory: (formData.get("uciCategory") as string) || null,
      description: (formData.get("description") as string) || null,
      program: (formData.get("program") as string) || null,
      parking: (formData.get("parking") as string) || null,
      organizer: (formData.get("organizer") as string) || null,
      registrationUrl: (formData.get("registrationUrl") as string) || null,
      navOrder: parseInt(formData.get("navOrder") as string) || 0,
      status: (formData.get("status") as string) || "DRAFT",
      heroImage: (formData.get("heroImage") as string) || null,
      heroVideo: (formData.get("heroVideo") as string) || null,
      heroVideoWebm: (formData.get("heroVideoWebm") as string) || null,
      showHeroVideo: formData.get("showHeroVideo") === "on",
      parkingImage: (formData.get("parkingImage") as string) || null,
    },
  });

  revalidatePath("/admin/zavody");
  revalidatePath("/");
  redirect("/admin/zavody");
}

export async function deleteRace(id: string) {
  await prisma.race.delete({ where: { id } });
  revalidatePath("/admin/zavody");
  revalidatePath("/");
}
