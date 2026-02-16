"use client";

import { useState } from "react";
import TiptapEditor from "./TiptapEditor";

type Article = {
  id?: string;
  title: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  tags: string | null;
  status: string;
  publishedAt: string | null;
};

export default function ArticleForm({
  article,
  action,
}: {
  article?: Article;
  action: (formData: FormData) => Promise<void>;
}) {
  const [content, setContent] = useState(article?.content || "");

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titulek *
          </label>
          <input
            name="title"
            defaultValue={article?.title}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-semibold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Krátký popis (excerpt)
          </label>
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt || ""}
            rows={2}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured image URL
            </label>
            <input
              name="featuredImage"
              defaultValue={article?.featuredImage || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="/uploads/photos/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tagy (JSON array)
            </label>
            <input
              name="tags"
              defaultValue={article?.tags || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder='["tag1", "tag2"]'
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              defaultValue={article?.status || "DRAFT"}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="DRAFT">Koncept</option>
              <option value="PUBLISHED">Publikováno</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum publikace
            </label>
            <input
              name="publishedAt"
              type="date"
              defaultValue={article?.publishedAt?.slice(0, 10) || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
          Obsah
        </h2>
        <input type="hidden" name="content" value={content} />
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
      >
        {article?.id ? "Uložit změny" : "Publikovat článek"}
      </button>
    </form>
  );
}
