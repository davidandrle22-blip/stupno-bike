import { prisma } from "@/lib/prisma";
import { updateSettings } from "@/lib/actions/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst({ where: { id: "main" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nastavení</h1>

      <form action={updateSettings} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název série
            </label>
            <input
              name="seriesName"
              defaultValue={settings?.seriesName || "AC Heating Cup"}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              name="logo"
              defaultValue={settings?.logo || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hlavní registrační odkaz
            </label>
            <input
              name="registrationUrl"
              type="url"
              defaultValue={settings?.registrationUrl || ""}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="https://registrace.sportobchod.cz"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook URL
              </label>
              <input
                name="facebookUrl"
                defaultValue={settings?.facebookUrl || ""}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram URL
              </label>
              <input
                name="instagramUrl"
                defaultValue={settings?.instagramUrl || ""}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kontaktní email
              </label>
              <input
                name="contactEmail"
                type="email"
                defaultValue={settings?.contactEmail || ""}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kontaktní telefon
              </label>
              <input
                name="contactPhone"
                defaultValue={settings?.contactPhone || ""}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                name="showUciLogo"
                type="checkbox"
                defaultChecked={settings?.showUciLogo ?? true}
              />
              <span className="text-sm font-medium text-gray-700">
                Zobrazit UCI logo
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Uložit nastavení
        </button>
      </form>
    </div>
  );
}
