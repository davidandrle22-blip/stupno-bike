import type { Metadata } from "next";
import PartneriGrid from "./PartneriGrid";

export const metadata: Metadata = {
  title: "Partneři | Stupno Bike XCO – UCI C1 MTB závod",
  description: "Partneři závodu Stupno Bike XCO – UCI C1 cross-country horských kol. CUBE, Plzeňský kraj, Raben, Primalex a další.",
};

export default function PartneriPage() {
  return <PartneriGrid />;
}
