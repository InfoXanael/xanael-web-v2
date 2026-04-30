import { notFound } from "next/navigation";
import { getTestingDispositivoDetail } from "@/lib/testing-queries";
import { DispositivoDetailShell } from "@/components/dashboard/testing/DispositivoDetailShell";

export default async function DispositivoDetailPage({ params }: { params: { id: string } }) {
  const dispositivo = await getTestingDispositivoDetail(params.id);
  if (!dispositivo) notFound();

  const serialized = JSON.parse(JSON.stringify(dispositivo));
  return <DispositivoDetailShell dispositivo={serialized} />;
}
