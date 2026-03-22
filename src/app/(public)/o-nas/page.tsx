import type { Metadata } from "next";
import SocialLinks from "@/components/frontend/SocialLinks";

export const metadata: Metadata = {
  title: "O závodě | MČR XCO Stupno 2026",
};

export default function ONasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
      <div className="mb-8 sm:mb-12">
        <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
          Sezóna 2026
        </span>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-3">
          O závodě
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-5 rounded-full" />
      </div>

      <div className="prose prose-lg max-w-none text-slate-300 leading-relaxed space-y-6">
        <p>
          <strong className="text-white">
            Mistrovství České republiky horských kol XCO — Stupno — Velká cena CUBE
          </strong>{" "}
          je vrcholnou akcí českého cross-country. Závod se koná v areálu Ultramarinka
          u Břas na technicky náročném okruhu 4,2 km, který prověří zdatnost
          i techniku každého závodníka.
        </p>
        <p>
          Třídenní program nabízí starty ve všech věkových kategoriích — od nejmladších
          závodníků (5–6 let) přes juniory a kadety až po elitní jezdce bojující
          o tituly mistrů České republiky. Součástí sobotního večera je Beer Ride,
          Disco party s DJ Jirkou Formanem a vystoupení kapely Pops.
        </p>
        <p>
          Stupno Bike je víc než závod — je to spojení vrcholového sportu
          s&nbsp;našlapaným doprovodným programem a&nbsp;neskutečnou atmosférou pro celou rodinu.
        </p>
      </div>

      <div className="mt-10 bg-white/[0.04] rounded-2xl border border-white/[0.08] p-6 text-sm text-slate-400 leading-relaxed">
        <strong className="text-white">Pořadatel:</strong> Author team Stupno z.s.,
        Stupno 245, 338 24 Břasy, IČO: 22818057
      </div>

      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Sledujte nás</p>
        <SocialLinks
          facebookUrl="https://www.facebook.com/stupnobike/"
          instagramUrl="https://www.instagram.com/stupnobike/"
        />
      </div>
    </div>
  );
}
