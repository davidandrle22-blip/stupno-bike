"use client";

import { useState } from "react";
import TiptapEditor from "./TiptapEditor";

type Race = {
  id?: string;
  title: string;
  date: string;
  dateEnd: string | null;
  location: string;
  uciCategory: string | null;
  description: string | null;
  program: string | null;
  parking: string | null;
  organizer: string | null;
  registrationUrl: string | null;
  navOrder: number;
  status: string;
  heroImage: string | null;
  heroVideo: string | null;
  heroVideoWebm: string | null;
  showHeroVideo: boolean;
  parkingImage: string | null;
};

export default function RaceForm({
  race,
  action,
}: {
  race?: Race;
  action: (formData: FormData) => Promise<void>;
}) {
  const [description, setDescription] = useState(race?.description || "");
  const [parking, setParking] = useState(race?.parking || "");
  const [organizer, setOrganizer] = useState(race?.organizer || "");

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
          Základní informace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název závodu *
            </label>
            <input
              name="title"
              defaultValue={race?.title}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Místo *
            </label>
            <input
              name="location"
              defaultValue={race?.location}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum *
            </label>
            <input
              name="date"
              type="date"
              defaultValue={race?.date?.slice(0, 10)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum konce
            </label>
            <input
              name="dateEnd"
              type="date"
              defaultValue={race?.dateEnd?.slice(0, 10) || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UCI Kategorie
            </label>
            <select
              name="uciCategory"
              defaultValue={race?.uciCategory || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="">Žádná</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Odkaz na registraci
            </label>
            <input
              name="registrationUrl"
              type="url"
              defaultValue={race?.registrationUrl || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pořadí v navigaci
            </label>
            <input
              name="navOrder"
              type="number"
              defaultValue={race?.navOrder || 0}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              defaultValue={race?.status || "DRAFT"}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="DRAFT">Koncept</option>
              <option value="PUBLISHED">Publikováno</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero obrázek URL
          </label>
          <input
            name="heroImage"
            defaultValue={race?.heroImage || ""}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="/media/races/stupno/hero-poster.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero video MP4 URL
            </label>
            <input
              name="heroVideo"
              defaultValue={race?.heroVideo || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="/media/races/stupno/hero-video-720p.mp4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero video WebM URL
            </label>
            <input
              name="heroVideoWebm"
              defaultValue={race?.heroVideoWebm || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="/media/races/stupno/hero-video-720p.webm"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              name="showHeroVideo"
              type="checkbox"
              defaultChecked={race?.showHeroVideo ?? false}
            />
            <span className="text-sm font-medium text-gray-700">
              Zobrazit video na hero sekci
            </span>
          </label>
          <p className="text-xs text-gray-400 mt-1 ml-6">
            Pokud ne, zobrazí se pouze statická fotka s Ken Burns efektem
          </p>
        </div>
      </div>

      {/* Propozice */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
          Propozice
        </h2>
        <input type="hidden" name="description" value={description} />
        <TiptapEditor content={description} onChange={setDescription} />
      </div>

      {/* Program */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
          Program (JSON)
        </h2>
        <textarea
          name="program"
          defaultValue={race?.program || ""}
          rows={6}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
          placeholder='[{"day":"Sobota","items":[{"time":"9:00","desc":"Kadeti"}]}]'
        />
      </div>

      {/* Parkování */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
          Parkování
        </h2>
        <input type="hidden" name="parking" value={parking} />
        <TiptapEditor content={parking} onChange={setParking} />
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Obrázek schématu parkování URL
          </label>
          <input
            name="parkingImage"
            defaultValue={race?.parkingImage || ""}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Pořadatel */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
          Pořadatel
        </h2>
        <input type="hidden" name="organizer" value={organizer} />
        <TiptapEditor content={organizer} onChange={setOrganizer} />
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          {race?.id ? "Uložit změny" : "Vytvořit závod"}
        </button>
      </div>
    </form>
  );
}
