import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticle } from "@/lib/actions/articles";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const articleData = {
    id: article.id,
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    featuredImage: article.featuredImage,
    tags: article.tags,
    status: article.status,
    publishedAt: article.publishedAt?.toISOString() || null,
  };

  const updateWithId = updateArticle.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Upravit: {article.title}
      </h1>
      <ArticleForm article={articleData} action={updateWithId} />
    </div>
  );
}
