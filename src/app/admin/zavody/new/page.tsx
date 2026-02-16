import RaceForm from "@/components/admin/RaceForm";
import { createRace } from "@/lib/actions/races";

export default function NewRacePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nový závod</h1>
      <RaceForm action={createRace} />
    </div>
  );
}
