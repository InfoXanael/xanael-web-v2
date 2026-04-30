import { notFound } from "next/navigation";
import { getTestingSiteDetail } from "@/lib/testing-queries";
import { SiteDetailShell } from "@/components/dashboard/testing/SiteDetailShell";

export default async function SiteDetailPage({ params }: { params: { id: string } }) {
  const site = await getTestingSiteDetail(params.id);
  if (!site) notFound();

  // Serialize dates for client component
  const serialized = JSON.parse(JSON.stringify(site));

  return <SiteDetailShell site={serialized} />;
}
