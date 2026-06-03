import { getPipelineLeads } from "@/lib/db-queries";
import PipelineBoard from "@/components/dashboard/PipelineBoard";

export default async function PipelinePage() {
  const leads = await getPipelineLeads();
  const serialized = leads.map((l) => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
    ultimoContacto: l.ultimoContacto?.toISOString() ?? null,
  }));
  return <PipelineBoard initialLeads={serialized} />;
}
