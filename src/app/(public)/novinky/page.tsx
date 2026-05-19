import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import type { Metadata } from "next";

export const revalidate = 0;

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

      <AnimatedSection>
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Zde budeme průběžně zveřejňovat nové články a informace týkající se závodu —
            aktuální novinky z příprav, informace pro závodníky, změny v programu
            a vše důležité kolem MČR XCO Stupno 2026.
          </p>
        </div>
      </AnimatedSection>

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
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
                      </svg>
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
        <p className="text-slate-400 text-sm">Články budou brzy přidány.</p>
      )}
    </div>
  );
}
