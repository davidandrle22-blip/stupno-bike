import { redirect } from "next/navigation";

export default async function RacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/zavod/${slug}/propozice`);
}
