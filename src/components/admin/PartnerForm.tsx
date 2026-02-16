"use client";

type Partner = {
  id?: string;
  name: string;
  logo: string;
  url: string | null;
  type: string;
  order: number;
};

export default function PartnerForm({
  partner,
  action,
}: {
  partner?: Partner;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Název *
          </label>
          <input
            name="name"
            defaultValue={partner?.name}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL *
          </label>
          <input
            name="logo"
            defaultValue={partner?.logo}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="/uploads/partners/logo.svg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Web URL
          </label>
          <input
            name="url"
            type="url"
            defaultValue={partner?.url || ""}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Typ
            </label>
            <select
              name="type"
              defaultValue={partner?.type || "SERIES"}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="MAIN">Hlavní partner</option>
              <option value="SERIES">Partner série</option>
              <option value="RACE">Partner závodu</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pořadí
            </label>
            <input
              name="order"
              type="number"
              defaultValue={partner?.order || 0}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
      >
        {partner?.id ? "Uložit změny" : "Přidat partnera"}
      </button>
    </form>
  );
}
