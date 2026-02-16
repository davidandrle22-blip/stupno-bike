import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deletePartner } from "@/lib/actions/partners";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Partneři</h1>
        <Link
          href="/admin/partneri/new"
          className="bg-primary hover:bg-primary-dark text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Přidat partnera
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Partner
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Typ
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Pořadí
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                Akce
              </th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">
                      {partner.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      partner.type === "MAIN"
                        ? "bg-sky-100 text-sky-700"
                        : partner.type === "SERIES"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {partner.type === "MAIN"
                      ? "Hlavní"
                      : partner.type === "SERIES"
                      ? "Série"
                      : "Závod"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {partner.order}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/partneri/${partner.id}`}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded font-medium"
                    >
                      Upravit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deletePartner(partner.id);
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
