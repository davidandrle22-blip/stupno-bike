import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt || undefined,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, status: "PUBLISHED" },
  });

  if (!article) notFound();

  const tags: string[] = article.tags ? JSON.parse(article.tags) : [];

  // Related articles
  const related = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: article.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/novinky"
        className="text-secondary hover:text-secondary-dark text-sm font-medium mb-4 inline-block"
      >
        &larr; Zpět na novinky
      </Link>

      {article.featuredImage && (
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-[220px] sm:h-[320px] lg:h-[420px] object-cover rounded-xl mb-6"
        />
      )}

      <div className="mb-4">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          {article.publishedAt
            ? formatDate(article.publishedAt)
            : formatDate(article.createdAt)}
        </p>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
        {article.title}
      </h1>

      <div
        className="tiptap-content prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/[0.08] text-slate-300 text-xs px-3 py-1 rounded-full border border-white/[0.1]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <div className="border-t border-white/[0.08] pt-8 mt-8">
          <h2 className="text-2xl font-extrabold text-white uppercase mb-6">
            Další články
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r: { id: string; slug: string; title: string; publishedAt: Date | null; createdAt: Date }) => (
              <Link
                key={r.id}
                href={`/novinky/${r.slug}`}
                className="group block bg-white/[0.06] rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all"
              >
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    {r.publishedAt
                      ? formatDate(r.publishedAt)
                      : formatDate(r.createdAt)}
                  </p>
                  <h3 className="font-bold text-white group-hover:text-secondary transition-colors">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
