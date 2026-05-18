import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function ParkovaniPage({
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
        Parkování
      </h2>
      <div className="space-y-8">

        {/* Parkování pro veřejnost */}
        <div>
          <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
            Parkování pro veřejnost
          </h3>
          <div className="space-y-3">
            {[
              { label: "Parkoviště u hasičské stanice Břasy", lat: "49.8342567", lng: "13.5822214" },
              { label: "Parkoviště pod házenkářským hřištěm Stupno", lat: "49.827007", lng: "13.580379" },
              { label: "Prostor Stupno u kolejí", lat: "49.8287019", lng: "13.5764342" },
            ].map(({ label, lat, lng }) => (
              <div key={label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-slate-200 text-sm">{label}</span>
                <a
                  href={`https://www.google.com/maps?q=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-light transition-colors shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  GPS: {lat}, {lng}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Parkování pro týmy */}
        <div>
          <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
            Parkování pro týmy
          </h3>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4 text-sm text-slate-300">
            <p>
              V těsné blízkosti areálu — rozděleno do parkovacích zón.
              Základní týmové stání o velikosti <strong className="text-white">50 m²</strong>.
              Ceny jsou uvedeny za celý závodní víkend, platba v hotovosti na místě.
            </p>
            <p>
              Na místě při příjezdu Vás pořadatel umístí, platba v hotovosti.
              Rezervace zasílejte emailem na{" "}
              <a href="mailto:rybovalinda@email.cz" className="text-primary hover:text-primary-light transition-colors font-medium">
                rybovalinda@email.cz
              </a>
              {" "}— možná do <strong className="text-white">úterý 14. 7. 2026</strong>.
            </p>

            {/* Tabulka cen */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-slate-400 font-semibold uppercase tracking-wide text-[11px]">Zóna</th>
                    <th className="text-right py-2 text-slate-400 font-semibold uppercase tracking-wide text-[11px]">Cena</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {[
                    { zona: "Team A1 – A2", cena: "600 Kč" },
                    { zona: "Team B", cena: "400 Kč" },
                    { zona: "Team C", cena: "400 Kč" },
                    { zona: "Karavany A – B", cena: "1 000 Kč" },
                  ].map(({ zona, cena }) => (
                    <tr key={zona}>
                      <td className="py-2.5 pr-4 text-slate-200">{zona}</td>
                      <td className="py-2.5 text-right font-semibold text-white">{cena}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
