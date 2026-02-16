import { prisma } from "@/lib/prisma";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findFirst({ where: { id: "main" } });

  const settingsData = {
    seriesName: settings?.seriesName || "Mistrovství XC Horských kol STUPNO",
    registrationUrl: settings?.registrationUrl || null,
    showUciLogo: settings?.showUciLogo ?? true,
    contactEmail: settings?.contactEmail || null,
    contactPhone: settings?.contactPhone || null,
    facebookUrl: settings?.facebookUrl || null,
    instagramUrl: settings?.instagramUrl || null,
  };

  return (
    <>
      <Header settings={settingsData} />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer settings={settingsData} />
    </>
  );
}
