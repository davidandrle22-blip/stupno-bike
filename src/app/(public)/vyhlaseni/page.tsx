import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vyhlášení",
  description: "Slavnostní vyhlášení série AC Heating Cup",
};

export default async function VyhlaseniPage() {
  const page = await prisma.page.findUnique({
    where: { slug: "vyhlaseni" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-dark uppercase tracking-tight mb-8">
        Vyhlášení série
      </h1>
      {page?.content ? (
        <div
          className="tiptap-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Informace o vyhlášení série budou zveřejněny po posledním závodě.
          </p>
        </div>
      )}
    </div>
  );
}
