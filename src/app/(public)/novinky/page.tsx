import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Novinky",
  description: "Nejnovější zprávy ze série AC Heating Cup",
};

export default async function NovinkyPage() {
  type ArticleRow = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    publishedAt: Date | null;
    createdAt: Date;
  };
  const articles = (await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  })) as ArticleRow[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight mb-6 sm:mb-8">
        Novinky
      </h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.1}>
              <Link
                href={`/novinky/${article.slug}`}
                className="group block bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 bg-white/[0.04] overflow-hidden">
                  {article.featuredImage ? (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                      <span className="text-5xl opacity-20">📰</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                    {article.publishedAt
                      ? formatDate(article.publishedAt)
                      : formatDate(article.createdAt)}
                  </p>
                  <h2 className="font-bold text-lg text-white group-hover:text-secondary transition-colors">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">Zatím nejsou žádné novinky.</p>
      )}
    </div>
  );
}
