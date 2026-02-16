import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trophy, FileText, Image, Video, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [raceCount, articleCount, photoCount, videoCount, partnerCount] =
    await Promise.all([
      prisma.race.count(),
      prisma.article.count(),
      prisma.photo.count(),
      prisma.video.count(),
      prisma.partner.count(),
    ]);

  const stats = [
    { label: "Závody", count: raceCount, icon: Trophy, href: "/admin/zavody", color: "bg-sky-50 text-sky-700" },
    { label: "Články", count: articleCount, icon: FileText, href: "/admin/clanky", color: "bg-blue-50 text-blue-700" },
    { label: "Fotky", count: photoCount, icon: Image, href: "/admin/fotky", color: "bg-green-50 text-green-700" },
    { label: "Videa", count: videoCount, icon: Video, href: "/admin/videa", color: "bg-purple-50 text-purple-700" },
    { label: "Partneři", count: partnerCount, icon: Users, href: "/admin/partneri", color: "bg-orange-50 text-orange-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/zavody/new"
          className="bg-primary hover:bg-primary-dark text-black font-bold p-4 rounded-xl text-center transition-colors"
        >
          + Přidat závod
        </Link>
        <Link
          href="/admin/clanky/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 rounded-xl text-center transition-colors"
        >
          + Napsat článek
        </Link>
      </div>
    </div>
  );
}
