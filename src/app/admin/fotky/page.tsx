import { prisma } from "@/lib/prisma";
import PhotosManager from "@/components/admin/PhotosManager";

export const dynamic = "force-dynamic";

export default async function AdminPhotosPage() {
  const [photos, races] = await Promise.all([
    prisma.photo.findMany({
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fotky</h1>
      <PhotosManager initialPhotos={photos} races={races} />
    </div>
  );
}
