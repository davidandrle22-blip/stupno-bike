import ArticleForm from "@/components/admin/ArticleForm";
import { createArticle } from "@/lib/actions/articles";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nový článek</h1>
      <ArticleForm action={createArticle} />
    </div>
  );
}
