import { Suspense } from "react";
import { getTestingSites } from "@/lib/testing-queries";
import { SitesPageClient } from "@/components/dashboard/testing/SitesPageClient";

export default async function SitesPage({
  searchParams,
}: {
  searchParams: { estado?: string; municipio?: string };
}) {
  const raw = await getTestingSites({
    estado: searchParams.estado,
    municipio: searchParams.municipio,
  });
  const sites = JSON.parse(JSON.stringify(raw));

  return (
    <Suspense>
      <SitesPageClient sites={sites} total={sites.length} />
    </Suspense>
  );
}
