import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageForm from "@/components/admin/PageForm";
import { updatePage } from "@/lib/actions/settings";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  const updateWithId = updatePage.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Upravit: {page.title}
      </h1>
      <PageForm page={page} action={updateWithId} />
    </div>
  );
}
