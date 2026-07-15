"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import TiptapEditor from "./TiptapEditor";
import { ImageIcon, VideoIcon, X, Upload } from "lucide-react";

type Article = {
  id?: string;
  title: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  videoUrl: string | null;
  tags: string | null;
  status: string;
  publishedAt: string | null;
};

const inputCls =
  "w-full px-3 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-400 bg-white";

export default function ArticleForm({
  article,
  action,
}: {
  article?: Article;
  action: (formData: FormData) => Promise<void>;
}) {
  const [content, setContent] = useState(article?.content || "");

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(article?.featuredImage || null);
  const [imageUrl, setImageUrl] = useState<string>(article?.featuredImage || "");
  const [imageUploading, setImageUploading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  // Video state
  const [videoMode, setVideoMode] = useState<"url" | "file">("url");
  const [videoUrl, setVideoUrl] = useState<string>(article?.videoUrl || "");
  const [videoUploading, setVideoUploading] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      // Resize + compress to max 1200px wide, JPEG 85% quality
      const bitmap = await createImageBitmap(file);
      const maxW = 1200;
      const scale = bitmap.width > maxW ? maxW / bitmap.width : 1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      setImagePreview(canvas.toDataURL("image/jpeg", 0.85));

      const compressed = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/jpeg", 0.85);
      });
      const blob = await upload(`articles/${Date.now()}-${file.name}`, compressed, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setImageUrl(blob.url);
    } catch {
      alert("Nahrání obrázku se nepovedlo.");
      setImagePreview(null);
      setImageUrl("");
    } finally {
      setImageUploading(false);
    }
  }

  async function handleVideoFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    try {
      const blob = await upload(`articles/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setVideoUrl(blob.url);
    } catch {
      alert("Nahrání videa se nepovedlo.");
      setVideoUrl("");
    } finally {
      setVideoUploading(false);
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">

        {/* Titulek */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Titulek <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            defaultValue={article?.title}
            required
            className={`${inputCls} text-lg font-semibold`}
            placeholder="Název článku…"
          />
        </div>

        {/* Perex */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Krátký popis (excerpt)
          </label>
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt || ""}
            rows={2}
            className={inputCls}
            placeholder="Krátký popis zobrazený v přehledu článků…"
          />
        </div>

        {/* Obrázek upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Titulní obrázek
          </label>
          <input type="hidden" name="featuredImage" value={imageUrl} />
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="preview"
                className="h-40 w-auto max-w-full object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => { setImagePreview(null); setImageUrl(""); if (imageRef.current) imageRef.current.value = ""; }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
              >
                <X size={12} />
              </button>
              {imageUploading && (
                <div className="absolute inset-0 bg-white/70 rounded-lg flex items-center justify-center text-xs text-gray-600">
                  Nahrávám…
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-400 hover:border-blue-500 rounded-lg text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Upload size={16} />
              Vybrat obrázek z PC / mobilu
            </button>
          )}
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Video
          </label>
          <input type="hidden" name="videoUrl" value={videoUrl} />
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setVideoMode("url")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${videoMode === "url" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-600 border-gray-400 hover:border-blue-400"}`}
            >
              <VideoIcon size={13} /> YouTube / URL
            </button>
            <button
              type="button"
              onClick={() => setVideoMode("file")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${videoMode === "file" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-600 border-gray-400 hover:border-blue-400"}`}
            >
              <Upload size={13} /> Nahrát soubor
            </button>
          </div>

          {videoMode === "url" ? (
            <input
              type="url"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              className={inputCls}
              placeholder="https://www.youtube.com/watch?v=…"
            />
          ) : (
            <div>
              <input
                ref={videoRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoFileChange}
              />
              {videoUrl && videoMode === "file" ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-300 rounded-lg text-sm text-green-700">
                  <VideoIcon size={14} />
                  Video nahráno
                  <button type="button" onClick={() => { setVideoUrl(""); if (videoRef.current) videoRef.current.value = ""; }} className="ml-auto text-red-500 hover:text-red-700">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => videoRef.current?.click()}
                  disabled={videoUploading}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-400 hover:border-blue-500 rounded-lg text-sm text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  <Upload size={16} />
                  {videoUploading ? "Nahrávám…" : "Vybrat video z PC / mobilu"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tagy */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Tagy (JSON array)
          </label>
          <input
            name="tags"
            defaultValue={article?.tags || ""}
            className={inputCls}
            placeholder='["tag1", "tag2"]'
          />
        </div>

        {/* Status + Datum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Status
            </label>
            <select
              name="status"
              defaultValue={article?.status || "DRAFT"}
              className={inputCls}
            >
              <option value="DRAFT">Koncept</option>
              <option value="PUBLISHED">Publikováno</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Datum publikace
            </label>
            <input
              name="publishedAt"
              type="date"
              defaultValue={article?.publishedAt?.slice(0, 10) || ""}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Obsah */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 border-b pb-3 mb-4">
          Obsah článku
        </h2>
        <input type="hidden" name="content" value={content} />
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        {article?.id ? "Uložit změny" : "Publikovat článek"}
      </button>
    </form>
  );
}
