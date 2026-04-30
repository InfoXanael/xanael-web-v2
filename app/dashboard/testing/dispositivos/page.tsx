import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Cpu, Star } from "lucide-react";
import { getTestingDispositivos } from "@/lib/testing-queries";
import { DispositivosFilters } from "@/components/dashboard/testing/DispositivosFilters";

const ESTADO_BADGE: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700",
  retirado: "bg-gray-100 text-gray-500",
  averiado: "bg-red-50 text-red-600",
  en_revision: "bg-amber-50 text-amber-700",
};

function formatDate(d: Date | string) {
  return new Date(d as string).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function DispositivosPage({
  searchParams,
}: {
  searchParams: { tipo?: string; estado?: string };
}) {
  const dispositivos = await getTestingDispositivos({
    tipo: searchParams.tipo,
    estado: searchParams.estado,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A4A3A]">Dispositivos</h1>
          <p className="text-sm text-gray-500 mt-0.5">{dispositivos.length} dispositivo{dispositivos.length !== 1 ? "s" : ""} registrado{dispositivos.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/dashboard/testing/comparativa"
          className="flex items-center gap-1.5 border border-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
        >
          Ver comparativa
        </Link>
      </div>

      <Suspense>
        <DispositivosFilters />
      </Suspense>

      <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
        {dispositivos.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <Cpu size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-sm font-medium text-gray-500">No hay dispositivos registrados</p>
            <p className="text-xs text-gray-400 mt-1">Los dispositivos se añaden desde el detalle de cada sitio de testeo</p>
            <Link href="/dashboard/testing/sites" className="mt-3 inline-block text-sm text-[#2D6A4F] hover:underline">
              Ver sitios
            </Link>
          </div>
        ) : (
          dispositivos.map((d) => (
            <Link
              key={d.id}
              href={`/dashboard/testing/dispositivos/${d.id}`}
              className="flex items-center px-5 py-4 hover:bg-gray-50/80 transition-colors gap-4 group"
            >
              <Cpu size={15} className="text-[#2D6A4F] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#2D6A4F] transition-colors truncate">{d.nombre}</p>
                  {d.evaluacion?.recomendado && <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {d.tipo.replace(/_/g, " ")}
                  {d.fabricante && ` · ${d.fabricante}`}
                  {d.modelo && ` ${d.modelo}`}
                </p>
                <p className="text-xs text-gray-300">{d.site.nombre} · {formatDate(d.fechaInstalacion)}</p>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-xs text-gray-400">
                {d.evaluacion?.puntuacionTotal !== null && d.evaluacion?.puntuacionTotal !== undefined && (
                  <span className="font-bold text-[#2D6A4F] text-sm">{d.evaluacion.puntuacionTotal.toFixed(1)}</span>
                )}
                <span>{d._count.mediciones} med.</span>
                {d._count.incidencias > 0 && <span className="text-amber-500 font-medium">{d._count.incidencias} inc.</span>}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${ESTADO_BADGE[d.estado] ?? "bg-gray-100 text-gray-600"}`}>
                {d.estado}
              </span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-[#2D6A4F] flex-shrink-0 transition-colors" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
