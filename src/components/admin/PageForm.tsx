"use client";

import { useState } from "react";
import TiptapEditor from "./TiptapEditor";

type PageData = {
  id: string;
  title: string;
  content: string;
  heroImage: string | null;
};

export default function PageForm({
  page,
  action,
}: {
  page: PageData;
  action: (formData: FormData) => Promise<void>;
}) {
  const [content, setContent] = useState(page.content);

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Název stránky
          </label>
          <input
            name="title"
            defaultValue={page.title}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero obrázek URL
          </label>
          <input
            name="heroImage"
            defaultValue={page.heroImage || ""}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
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
        className="bg-primary hover:bg-primary-dark text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
      >
        Uložit změny
      </button>
    </form>
  );
}
