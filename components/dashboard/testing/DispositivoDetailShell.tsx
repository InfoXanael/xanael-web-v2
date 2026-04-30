"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Activity, CheckCircle, XCircle, Star } from "lucide-react";

type Evaluacion = {
  fiabilidadDeteccion: number | null; resistenciaClimatica: number | null;
  facilidadInstalacion: number | null; facilidadMantenimiento: number | null;
  autonomiaBateria: number | null; calidadDatos: number | null;
  relacionCalidadPrecio: number | null; compatibilidadXanael: number | null;
  puntuacionTotal: number | null; recomendado: boolean; notas: string | null;
};
type Medicion = { id: string; tipo: string; valor: number | null; unidad: string | null; descripcion: string | null; fecha: string };
type Foto = { id: string; url: string; tipo: string; descripcion: string | null; fecha: string };
type Incidencia = { id: string; tipo: string; severidad: string; descripcion: string; resuelta: boolean; fecha: string };
type Dispositivo = {
  id: string; nombre: string; fabricante: string | null; modelo: string | null;
  tipo: string; conectividad: string | null; numeroSerie: string | null;
  posicionBordillo: string | null; fechaInstalacion: string; fechaRetirada: string | null;
  estado: string; notas: string | null;
  site: { id: string; nombre: string; municipio: string };
  evaluacion: Evaluacion | null;
  mediciones: Medicion[]; fotos: Foto[]; incidencias: Incidencia[];
};

const CRITERIOS: { key: keyof Evaluacion; label: string }[] = [
  { key: "fiabilidadDeteccion", label: "Fiabilidad detección" },
  { key: "resistenciaClimatica", label: "Resistencia climática" },
  { key: "facilidadInstalacion", label: "Facilidad instalación" },
  { key: "facilidadMantenimiento", label: "Facilidad mantenimiento" },
  { key: "autonomiaBateria", label: "Autonomía batería" },
  { key: "calidadDatos", label: "Calidad de datos" },
  { key: "relacionCalidadPrecio", label: "Calidad / Precio" },
  { key: "compatibilidadXanael", label: "Compatibilidad XANAEL" },
];

const SEVERIDAD_BADGE: Record<string, string> = {
  baja: "bg-blue-50 text-blue-600", media: "bg-amber-50 text-amber-700",
  alta: "bg-orange-50 text-orange-700", critica: "bg-red-50 text-red-700",
};
const ESTADO_COLORS: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700", retirado: "bg-gray-100 text-gray-500",
  averiado: "bg-red-50 text-red-600", en_revision: "bg-amber-50 text-amber-700",
};

const EMPTY_EVAL: Evaluacion = {
  fiabilidadDeteccion: null, resistenciaClimatica: null, facilidadInstalacion: null,
  facilidadMantenimiento: null, autonomiaBateria: null, calidadDatos: null,
  relacionCalidadPrecio: null, compatibilidadXanael: null, puntuacionTotal: null,
  recomendado: false, notas: null,
};

function fmt(d: string) { return new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }); }
function fmtDT(d: string) { return new Date(d).toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); }

export function DispositivoDetailShell({ dispositivo }: { dispositivo: Dispositivo }) {
  const router = useRouter();
  const [tab, setTab] = useState<"info" | "mediciones" | "fotos" | "incidencias" | "evaluacion">("info");
  const [evalForm, setEvalForm] = useState<Evaluacion>(dispositivo.evaluacion ?? EMPTY_EVAL);
  const [evalSaving, setEvalSaving] = useState(false);
  const [evalSaved, setEvalSaved] = useState(false);

  async function handleResolve(incId: string, resuelta: boolean) {
    await fetch(`/api/testing/incidencias/${incId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resuelta }),
    });
    router.refresh();
  }

  async function handleSaveEval() {
    setEvalSaving(true);
    try {
      await fetch(`/api/testing/evaluaciones/${dispositivo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evalForm),
      });
      setEvalSaved(true);
      setTimeout(() => setEvalSaved(false), 2500);
      router.refresh();
    } finally {
      setEvalSaving(false);
    }
  }

  const TABS = [
    { key: "info", label: "Ficha" },
    { key: "mediciones", label: `Mediciones (${dispositivo.mediciones.length})` },
    { key: "fotos", label: `Fotos (${dispositivo.fotos.length})` },
    { key: "incidencias", label: `Incidencias (${dispositivo.incidencias.length})` },
    { key: "evaluacion", label: "Evaluación" },
  ] as const;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <button onClick={() => router.back()} className="mt-1.5 text-gray-400 hover:text-[#2D6A4F] transition-colors flex-shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1A4A3A] truncate">{dispositivo.nombre}</h1>
            {dispositivo.evaluacion?.recomendado && (
              <Star size={16} className="text-amber-400 fill-amber-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {dispositivo.tipo.replace(/_/g, " ")}
            {dispositivo.fabricante && ` · ${dispositivo.fabricante}`}
            {dispositivo.modelo && ` ${dispositivo.modelo}`}
            {" · "}
            <Link href={`/dashboard/testing/sites/${dispositivo.site.id}`} className="text-[#2D6A4F] hover:underline">
              {dispositivo.site.nombre}
            </Link>
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-md font-medium flex-shrink-0 ${ESTADO_COLORS[dispositivo.estado] ?? "bg-gray-100 text-gray-500"}`}>
          {dispositivo.estado}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-4 overflow-x-auto">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === key ? "border-[#2D6A4F] text-[#2D6A4F]" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Ficha */}
      {tab === "info" && (
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
          {([
            ["Fabricante", dispositivo.fabricante],
            ["Modelo", dispositivo.modelo],
            ["Tipo", dispositivo.tipo.replace(/_/g, " ")],
            ["Conectividad", dispositivo.conectividad],
            ["Número de serie", dispositivo.numeroSerie],
            ["Posición en bordillo", dispositivo.posicionBordillo?.replace(/_/g, " ")],
            ["Fecha instalación", fmt(dispositivo.fechaInstalacion)],
            ["Fecha retirada", dispositivo.fechaRetirada ? fmt(dispositivo.fechaRetirada) : null],
            ["Sitio", `${dispositivo.site.nombre} (${dispositivo.site.municipio})`],
            ["Notas", dispositivo.notas],
          ] as [string, string | null | undefined][])
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label} className="flex px-5 py-3 gap-4">
                <span className="text-sm text-gray-400 w-44 flex-shrink-0">{label}</span>
                <span className="text-sm text-[#1A1A1A] font-medium">{value}</span>
              </div>
            ))}
        </div>
      )}

      {/* Mediciones */}
      {tab === "mediciones" && (
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
          {dispositivo.mediciones.length === 0 ? (
            <p className="px-5 py-10 text-sm text-gray-400 text-center">No hay mediciones para este dispositivo.</p>
          ) : (
            dispositivo.mediciones.map((m) => (
              <div key={m.id} className="flex items-center px-5 py-3 gap-3">
                <Activity size={13} className="text-[#2D6A4F] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-[#1A1A1A]">{m.tipo.replace(/_/g, " ")}</span>
                  {m.valor !== null && <span className="text-sm text-gray-500"> — {m.valor}{m.unidad ? ` ${m.unidad}` : ""}</span>}
                  {m.descripcion && <span className="text-sm text-gray-500"> — {m.descripcion}</span>}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{fmtDT(m.fecha)}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Fotos */}
      {tab === "fotos" && (
        dispositivo.fotos.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md px-5 py-10 text-sm text-gray-400 text-center">No hay fotos.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {dispositivo.fotos.map((foto) => (
              <a key={foto.id} href={foto.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-md overflow-hidden hover:border-[#2D6A4F]/40 transition-colors">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={foto.url} alt={foto.descripcion ?? foto.tipo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-700 truncate">{foto.tipo.replace(/_/g, " ")}</p>
                  {foto.descripcion && <p className="text-xs text-gray-400 truncate">{foto.descripcion}</p>}
                </div>
              </a>
            ))}
          </div>
        )
      )}

      {/* Incidencias */}
      {tab === "incidencias" && (
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
          {dispositivo.incidencias.length === 0 ? (
            <p className="px-5 py-10 text-sm text-gray-400 text-center">No hay incidencias para este dispositivo.</p>
          ) : (
            dispositivo.incidencias.map((inc) => (
              <div key={inc.id} className="flex items-start px-5 py-4 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${SEVERIDAD_BADGE[inc.severidad] ?? "bg-gray-100 text-gray-600"}`}>{inc.severidad}</span>
                    <span className="text-xs text-gray-500">{inc.tipo.replace(/_/g, " ")}</span>
                    {inc.resuelta && <span className="text-xs text-emerald-600 font-medium">Resuelta</span>}
                  </div>
                  <p className="text-sm text-[#1A1A1A]">{inc.descripcion}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{fmtDT(inc.fecha)}</p>
                </div>
                <button
                  onClick={() => handleResolve(inc.id, !inc.resuelta)}
                  className={`flex-shrink-0 mt-0.5 transition-colors ${inc.resuelta ? "text-emerald-500 hover:text-gray-400" : "text-gray-300 hover:text-emerald-500"}`}
                >
                  {inc.resuelta ? <CheckCircle size={18} /> : <XCircle size={18} />}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Evaluación */}
      {tab === "evaluacion" && (
        <div className="bg-white border border-gray-200 rounded-md p-6">
          {dispositivo.evaluacion?.puntuacionTotal !== null && dispositivo.evaluacion?.puntuacionTotal !== undefined && (
            <div className="flex items-center gap-4 mb-6 p-4 bg-[#F0F4F2] rounded-md">
              <span className="text-4xl font-bold text-[#2D6A4F]">{dispositivo.evaluacion.puntuacionTotal.toFixed(1)}</span>
              <div>
                <p className="text-sm font-semibold text-[#1A4A3A]">Puntuación global</p>
                <p className="text-xs text-gray-500">Media de criterios evaluados</p>
              </div>
              {dispositivo.evaluacion.recomendado && (
                <div className="ml-auto flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                  <Star size={14} className="fill-amber-500" /> Recomendado
                </div>
              )}
            </div>
          )}

          <div className="space-y-5">
            {CRITERIOS.map(({ key, label }) => {
              const val = evalForm[key] as number | null;
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <span className={`text-sm font-bold tabular-nums ${val !== null ? "text-[#2D6A4F]" : "text-gray-300"}`}>
                      {val !== null ? val.toFixed(1) : "—"}
                    </span>
                  </div>
                  <input
                    type="range" min={1} max={10} step={0.5}
                    value={val ?? 5}
                    onChange={(e) => setEvalForm((f) => ({ ...f, [key]: parseFloat(e.target.value) }))}
                    className="w-full accent-[#2D6A4F] h-1.5 rounded-full"
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-0.5">
                    <span>1</span><span>5</span><span>10</span>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
              <input
                type="checkbox" id="recomendado"
                checked={evalForm.recomendado}
                onChange={(e) => setEvalForm((f) => ({ ...f, recomendado: e.target.checked }))}
                className="accent-[#2D6A4F] w-4 h-4"
              />
              <label htmlFor="recomendado" className="text-sm text-gray-700">
                Marcar como dispositivo recomendado para bordillos XANAEL
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Notas</label>
              <textarea
                value={evalForm.notas ?? ""}
                onChange={(e) => setEvalForm((f) => ({ ...f, notas: e.target.value || null }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] resize-none bg-white"
                rows={3}
                placeholder="Observaciones sobre comportamiento en campo..."
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveEval}
                disabled={evalSaving}
                className="bg-[#2D6A4F] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50 font-medium"
              >
                {evalSaving ? "Guardando..." : evalSaved ? "Guardado" : "Guardar evaluación"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
