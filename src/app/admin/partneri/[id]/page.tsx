import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PartnerForm from "@/components/admin/PartnerForm";
import { updatePartner } from "@/lib/actions/partners";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const updateWithId = updatePartner.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Upravit: {partner.name}
      </h1>
      <PartnerForm partner={partner} action={updateWithId} />
    </div>
  );
}
