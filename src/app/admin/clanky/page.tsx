import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { deleteArticle } from "@/lib/actions/articles";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Články</h1>
        <Link
          href="/admin/clanky/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Nový článek
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Titulek
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Datum
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                Akce
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/clanky/${article.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      article.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {article.status === "PUBLISHED" ? "Publikováno" : "Koncept"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {article.publishedAt
                    ? formatDateShort(article.publishedAt)
                    : formatDateShort(article.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/clanky/${article.id}`}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded font-medium"
                    >
                      Upravit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteArticle(article.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded font-medium"
                      >
                        Smazat
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
