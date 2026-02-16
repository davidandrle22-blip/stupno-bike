import { prisma } from "@/lib/prisma";
import VideosManager from "@/components/admin/VideosManager";

export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  const [videos, races] = await Promise.all([
    prisma.video.findMany({
      orderBy: { createdAt: "desc" },
      include: { race: { select: { id: true, title: true } } },
    }),
    prisma.race.findMany({
      orderBy: { navOrder: "asc" },
      select: { id: true, title: true },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Videa</h1>
      <VideosManager initialVideos={videos} races={races} />
    </div>
  );
}
