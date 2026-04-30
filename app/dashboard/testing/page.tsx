import Link from "next/link";
import { MapPin, Cpu, Activity, AlertTriangle, Plus, ChevronRight } from "lucide-react";
import { getTestingStats, getTestingSites } from "@/lib/testing-queries";

const ESTADO_BADGE: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700",
  finalizado: "bg-gray-100 text-gray-600",
  pausado: "bg-amber-50 text-amber-700",
};

function formatDate(d: Date | string) {
  return new Date(d as string).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function TestingPage() {
  const [stats, sites] = await Promise.all([
    getTestingStats(),
    getTestingSites(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A4A3A]">Testing IoT</h1>
        <div className="flex gap-2">
          <Link
            href="/dashboard/testing/mediciones/nueva"
            className="flex items-center gap-1.5 bg-[#2D6A4F] text-white text-sm px-3 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors font-medium"
          >
            <Plus size={14} /> Medición
          </Link>
          <Link
            href="/dashboard/testing/sites"
            className="flex items-center gap-1.5 border border-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
          >
            Ver sitios
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: MapPin, label: "Sitios activos", value: stats.sitiosActivos },
          { icon: Cpu, label: "Dispositivos", value: stats.dispositivosInstalados },
          { icon: Activity, label: "Mediciones totales", value: stats.totalMediciones },
          { icon: AlertTriangle, label: "Incidencias abiertas", value: stats.incidenciasAbiertas, alert: stats.incidenciasAbiertas > 0 },
        ].map(({ icon: Icon, label, value, alert }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-md p-5">
            <Icon className={`w-5 h-5 mb-3 ${alert ? "text-amber-500" : "text-[#2D6A4F]"}`} />
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${alert ? "text-amber-500" : "text-[#1A1A1A]"}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { href: "/dashboard/testing/sites", label: "Sitios de testeo" },
          { href: "/dashboard/testing/dispositivos", label: "Dispositivos" },
          { href: "/dashboard/testing/comparativa", label: "Comparativa" },
          { href: "/dashboard/testing/casos-exito", label: "Casos de éxito" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="bg-white border border-gray-200 rounded-md px-4 py-3 text-sm text-[#1A4A3A] font-medium hover:border-[#2D6A4F]/40 hover:bg-[#F0F4F2] transition-colors flex items-center justify-between group"
          >
            {label}
            <ChevronRight size={14} className="text-gray-300 group-hover:text-[#2D6A4F] transition-colors" />
          </Link>
        ))}
      </div>

      {/* Últimos sitios */}
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#1A4A3A]">Sitios de testeo</h2>
          <Link href="/dashboard/testing/sites" className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1">
            Ver todos <ChevronRight size={12} />
          </Link>
        </div>
        {sites.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            No hay sitios registrados.{" "}
            <Link href="/dashboard/testing/sites" className="text-[#2D6A4F] hover:underline">Crear el primero</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sites.slice(0, 8).map((site) => (
              <Link
                key={site.id}
                href={`/dashboard/testing/sites/${site.id}`}
                className="flex items-center px-5 py-3.5 hover:bg-gray-50/80 transition-colors gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A] truncate group-hover:text-[#2D6A4F] transition-colors">{site.nombre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{site.municipio}, {site.provincia}</p>
                </div>
                <div className="hidden sm:flex items-center gap-5 text-xs text-gray-400">
                  <span>{site._count.dispositivos} disp.</span>
                  <span>{site._count.mediciones} med.</span>
                  {site._count.incidencias > 0 && <span className="text-amber-500 font-medium">{site._count.incidencias} inc.</span>}
                  <span>{formatDate(site.fechaInicio)}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${ESTADO_BADGE[site.estado] ?? "bg-gray-100 text-gray-600"}`}>
                  {site.estado}
                </span>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
