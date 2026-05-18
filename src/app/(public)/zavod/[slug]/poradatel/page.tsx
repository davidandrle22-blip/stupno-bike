import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function PoradatelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const race = await prisma.race.findUnique({ where: { slug } });
  if (!race) notFound();

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-6">
        Pořadatel
      </h2>
      <div className="space-y-6">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
          <h3 className="text-white font-bold text-lg mb-4">Author team Stupno z.s.</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-slate-500 font-semibold uppercase tracking-wide text-[11px] sm:w-28 shrink-0">Adresa</dt>
              <dd className="text-slate-200">Stupno 245, 338 24 Břasy</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-slate-500 font-semibold uppercase tracking-wide text-[11px] sm:w-28 shrink-0">IČO</dt>
              <dd className="text-slate-200">22818057</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-slate-500 font-semibold uppercase tracking-wide text-[11px] sm:w-28 shrink-0">Předseda</dt>
              <dd className="text-slate-200">Jaroslav Ryba</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
