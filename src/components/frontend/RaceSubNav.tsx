"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Propozice", path: "propozice" },
  { label: "Program", path: "program" },
  { label: "Parkování", path: "parkovani" },
  { label: "Okruhy", path: "okruhy" },
  { label: "Pořadatel", path: "poradatel" },
  { label: "Partneři", path: "partneri" },
  { label: "Výsledky", path: "vysledky" },
];

export default function RaceSubNav({
  slug,
  registrationUrl,
}: {
  slug: string;
  registrationUrl: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-border sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-0 overflow-x-auto py-0 -mb-px scrollbar-none">
          {tabs.map((tab) => {
            const href = `/zavod/${slug}/${tab.path}`;
            const isActive = pathname === href;
            return (
              <Link
                key={tab.path}
                href={href}
                className={cn(
                  "px-4 py-3.5 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-all uppercase tracking-wide",
                  isActive
                    ? "border-accent text-dark"
                    : "border-transparent text-gray-400 hover:text-dark hover:border-gray-200"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
          {/* Registrace CTA button */}
          {registrationUrl && (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 bg-gradient-to-r from-accent to-accent-dark text-white font-bold px-5 py-2 rounded-lg text-[13px] uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 my-1"
            >
              Registrace
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
