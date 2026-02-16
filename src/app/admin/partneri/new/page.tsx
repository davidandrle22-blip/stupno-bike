import PartnerForm from "@/components/admin/PartnerForm";
import { createPartner } from "@/lib/actions/partners";

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nový partner</h1>
      <PartnerForm action={createPartner} />
    </div>
  );
}
