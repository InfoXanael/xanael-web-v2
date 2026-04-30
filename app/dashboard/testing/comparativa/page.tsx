import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { getComparativa } from "@/lib/testing-queries";

const CRITERIOS = [
  { key: "fiabilidadDeteccion", label: "Detección" },
  { key: "resistenciaClimatica", label: "Clima" },
  { key: "facilidadInstalacion", label: "Instalación" },
  { key: "facilidadMantenimiento", label: "Mant." },
  { key: "autonomiaBateria", label: "Batería" },
  { key: "calidadDatos", label: "Datos" },
  { key: "relacionCalidadPrecio", label: "Cal./Precio" },
  { key: "compatibilidadXanael", label: "Compat." },
];

function ScoreCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-gray-200 text-xs">—</span>;
  const cls =
    value >= 8 ? "text-emerald-600 font-bold" :
    value >= 5 ? "text-amber-600 font-semibold" :
    "text-red-500 font-semibold";
  return <span className={`text-sm tabular-nums ${cls}`}>{value.toFixed(1)}</span>;
}

export default async function ComparativaPage() {
  const dispositivos = await getComparativa();

  const conEval = dispositivos
    .filter((d) => d.evaluacion?.puntuacionTotal !== null && d.evaluacion?.puntuacionTotal !== undefined)
    .sort((a, b) => (b.evaluacion!.puntuacionTotal ?? 0) - (a.evaluacion!.puntuacionTotal ?? 0));
  const sinEval = dispositivos.filter(
    (d) => d.evaluacion?.puntuacionTotal === null || d.evaluacion?.puntuacionTotal === undefined
  );
  const sorted = [...conEval, ...sinEval];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A4A3A]">Comparativa de dispositivos</h1>
          <p className="text-sm text-gray-500 mt-0.5">{conEval.length} de {dispositivos.length} dispositivos evaluados</p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md px-5 py-14 text-center">
          <p className="text-sm font-medium text-gray-500">No hay dispositivos registrados todavía</p>
          <p className="text-xs text-gray-400 mt-1">Añade dispositivos desde los sitios de testeo y completa sus evaluaciones</p>
          <Link href="/dashboard/testing/dispositivos" className="mt-3 inline-block text-sm text-[#2D6A4F] hover:underline">
            Ver dispositivos
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Dispositivo</th>
                {CRITERIOS.map((c) => (
                  <th key={c.key} className="text-center px-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap min-w-[72px]">
                    {c.label}
                  </th>
                ))}
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Total</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((d, i) => {
                const hasEval = d.evaluacion?.puntuacionTotal !== null && d.evaluacion?.puntuacionTotal !== undefined;
                return (
                  <tr key={d.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {hasEval && i < 3 && (
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                            i === 0 ? "bg-amber-50 text-amber-600" :
                            i === 1 ? "bg-gray-100 text-gray-500" :
                            "bg-orange-50 text-orange-500"
                          }`}>#{i + 1}</span>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-[#1A1A1A] group-hover:text-[#2D6A4F] transition-colors whitespace-nowrap">{d.nombre}</p>
                            {d.evaluacion?.recomendado && <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-400 whitespace-nowrap">
                            {d.tipo.replace(/_/g, " ")}
                            {d.fabricante && ` · ${d.fabricante}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    {CRITERIOS.map((c) => (
                      <td key={c.key} className="text-center px-2 py-3.5">
                        <ScoreCell value={d.evaluacion ? (d.evaluacion[c.key as keyof typeof d.evaluacion] as number | null) : null} />
                      </td>
                    ))}
                    <td className="text-center px-4 py-3.5">
                      {hasEval ? (
                        <span className={`text-base font-bold tabular-nums ${
                          d.evaluacion!.puntuacionTotal! >= 8 ? "text-emerald-600" :
                          d.evaluacion!.puntuacionTotal! >= 5 ? "text-amber-600" :
                          "text-red-500"
                        }`}>
                          {d.evaluacion!.puntuacionTotal!.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300">sin eval.</span>
                      )}
                    </td>
                    <td className="px-3 py-3.5">
                      <Link href={`/dashboard/testing/dispositivos/${d.id}`} className="text-gray-300 hover:text-[#2D6A4F] transition-colors">
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
