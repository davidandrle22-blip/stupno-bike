import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const validSlugs = ["o-nas", "pravidla", "kontakt", "dale-poradame"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!validSlugs.includes(slug)) return {};
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return {};
  return { title: page.title };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) notFound();

  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {page.heroImage && (
        <img
          src={page.heroImage}
          alt={page.title}
          className="w-full h-[300px] object-cover rounded-xl mb-6"
        />
      )}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-dark uppercase tracking-tight mb-8">
        {page.title}
      </h1>
      <div
        className="tiptap-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
