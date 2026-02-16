import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { deleteRace } from "@/lib/actions/races";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRacesPage() {
  const races = await prisma.race.findMany({
    orderBy: { navOrder: "asc" },
    include: { _count: { select: { results: true, photos: true, circuits: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Závody</h1>
        <Link
          href="/admin/zavody/new"
          className="bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Přidat závod
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Název
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Datum
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                UCI
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Data
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                Akce
              </th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <tr key={race.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/zavody/${race.id}`}
                    className="font-medium text-gray-900 hover:text-primary"
                  >
                    {race.title}
                  </Link>
                  <p className="text-xs text-gray-400">{race.location}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {formatDateShort(race.date)}
                </td>
                <td className="px-4 py-3">
                  {race.uciCategory && (
                    <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-0.5 rounded">
                      {race.uciCategory}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      race.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {race.status === "PUBLISHED" ? "Publikováno" : "Koncept"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {race._count.results} výsl. / {race._count.photos} fotek / {race._count.circuits} okr.
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/zavody/${race.id}`}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded font-medium"
                    >
                      Upravit
                    </Link>
                    <Link
                      href={`/admin/zavody/${race.id}/vysledky`}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-medium"
                    >
                      Výsledky
                    </Link>
                    <Link
                      href={`/admin/zavody/${race.id}/okruhy`}
                      className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded font-medium"
                    >
                      Okruhy
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteRace(race.id);
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
