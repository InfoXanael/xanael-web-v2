"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cpu, Activity, Camera, AlertTriangle, Plus, CheckCircle, XCircle, X, ArrowLeft } from "lucide-react";

type Dispositivo = {
  id: string; nombre: string; tipo: string; fabricante: string | null;
  estado: string; fechaInstalacion: string;
  evaluacion: { puntuacionTotal: number | null } | null;
};
type Medicion = {
  id: string; tipo: string; valor: number | null; unidad: string | null;
  descripcion: string | null; fecha: string;
  dispositivo: { nombre: string; tipo: string } | null;
};
type Foto = {
  id: string; url: string; tipo: string; descripcion: string | null; fecha: string;
};
type Incidencia = {
  id: string; tipo: string; severidad: string; descripcion: string;
  resuelta: boolean; fecha: string;
  dispositivo: { nombre: string } | null;
};
type Site = {
  id: string; nombre: string; municipio: string; provincia: string;
  direccion: string | null; coordenadas: string | null; descripcion: string | null;
  fechaInicio: string; fechaFin: string | null; estado: string;
  dispositivos: Dispositivo[]; mediciones: Medicion[];
  fotos: Foto[]; incidencias: Incidencia[];
};

const SEVERIDAD_BADGE: Record<string, string> = {
  baja: "bg-blue-50 text-blue-600",
  media: "bg-amber-50 text-amber-700",
  alta: "bg-orange-50 text-orange-700",
  critica: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};
const ESTADO_DISP: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700",
  retirado: "bg-gray-100 text-gray-500",
  averiado: "bg-red-50 text-red-600",
  en_revision: "bg-amber-50 text-amber-700",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtDT(d: string) {
  return new Date(d).toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] transition-colors bg-white";

export function SiteDetailShell({ site }: { site: Site }) {
  const router = useRouter();
  const [tab, setTab] = useState<"dispositivos" | "mediciones" | "fotos" | "incidencias">("dispositivos");
  const [incModalOpen, setIncModalOpen] = useState(false);
  const [incForm, setIncForm] = useState({
    tipo: "averia_dispositivo", severidad: "media",
    descripcion: "", dispositivoId: "", accionTomada: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleResolve(incId: string, resuelta: boolean) {
    await fetch(`/api/testing/incidencias/${incId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resuelta }),
    });
    router.refresh();
  }

  async function handleCreateInc() {
    if (!incForm.descripcion) return;
    setSaving(true);
    try {
      await fetch("/api/testing/incidencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...incForm, siteId: site.id, dispositivoId: incForm.dispositivoId || null }),
      });
      setIncModalOpen(false);
      setIncForm({ tipo: "averia_dispositivo", severidad: "media", descripcion: "", dispositivoId: "", accionTomada: "" });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const openInc = site.incidencias.filter((i) => !i.resuelta).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <button onClick={() => router.back()} className="mt-1.5 text-gray-400 hover:text-[#2D6A4F] transition-colors flex-shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-[#1A4A3A] truncate">{site.nombre}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {site.municipio}, {site.provincia}
            {site.direccion && <> · {site.direccion}</>}
          </p>
        </div>
        <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-md font-medium ${
          site.estado === "activo" ? "bg-emerald-50 text-emerald-700"
          : site.estado === "pausado" ? "bg-amber-50 text-amber-700"
          : "bg-gray-100 text-gray-600"
        }`}>
          {site.estado}
        </span>
      </div>

      {/* KPI mini */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Dispositivos", value: site.dispositivos.length, accent: false },
          { label: "Mediciones", value: site.mediciones.length + (site.mediciones.length === 50 ? "+" : ""), accent: false },
          { label: "Fotos", value: site.fotos.length, accent: false },
          { label: "Inc. abiertas", value: openInc, accent: openInc > 0 },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-md px-4 py-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-bold mt-0.5 ${accent ? "text-amber-500" : "text-[#1A4A3A]"}`}>{value}</p>
          </div>
        ))}
      </div>

      {site.descripcion && (
        <p className="text-sm text-gray-500 bg-white border border-gray-100 rounded-md px-5 py-3 mb-5">{site.descripcion}</p>
      )}

      {/* Acciones */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Link
          href={`/dashboard/testing/sites/${site.id}/nuevo-dispositivo`}
          className="flex items-center gap-1.5 bg-[#2D6A4F] text-white text-sm px-3 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors font-medium"
        >
          <Plus size={14} /> Dispositivo
        </Link>
        <Link
          href={`/dashboard/testing/mediciones/nueva?siteId=${site.id}`}
          className="flex items-center gap-1.5 border border-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Activity size={14} /> Medición
        </Link>
        <Link
          href={`/dashboard/testing/fotos/subir?siteId=${site.id}`}
          className="flex items-center gap-1.5 border border-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <Camera size={14} /> Foto
        </Link>
        <button
          onClick={() => setIncModalOpen(true)}
          className="flex items-center gap-1.5 border border-gray-200 text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <AlertTriangle size={14} /> Incidencia
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-4">
        {([
          { key: "dispositivos" as const, label: "Dispositivos", count: site.dispositivos.length, alert: false },
          { key: "mediciones" as const, label: "Mediciones", count: site.mediciones.length, alert: false },
          { key: "fotos" as const, label: "Fotos", count: site.fotos.length, alert: false },
          { key: "incidencias" as const, label: "Incidencias", count: site.incidencias.length, alert: openInc > 0 },
        ]).map(({ key, label, count, alert }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === key ? "border-[#2D6A4F] text-[#2D6A4F]" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-md ${
              alert ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Dispositivos */}
      {tab === "dispositivos" && (
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
          {site.dispositivos.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Cpu size={28} className="mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">No hay dispositivos instalados.</p>
              <Link href={`/dashboard/testing/sites/${site.id}/nuevo-dispositivo`} className="text-sm text-[#2D6A4F] hover:underline mt-1 inline-block">Añadir dispositivo</Link>
            </div>
          ) : (
            site.dispositivos.map((d) => (
              <Link key={d.id} href={`/dashboard/testing/dispositivos/${d.id}`} className="flex items-center px-5 py-3.5 hover:bg-gray-50/80 gap-3 group transition-colors">
                <Cpu size={15} className="text-[#2D6A4F] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#2D6A4F] transition-colors truncate">{d.nombre}</p>
                  <p className="text-xs text-gray-400">
                    {d.tipo.replace(/_/g, " ")}
                    {d.fabricante && ` · ${d.fabricante}`}
                    {" · Instalado "}{fmt(d.fechaInstalacion)}
                  </p>
                </div>
                {d.evaluacion?.puntuacionTotal !== null && d.evaluacion?.puntuacionTotal !== undefined && (
                  <span className="text-xs font-semibold text-[#2D6A4F] hidden sm:block">{d.evaluacion.puntuacionTotal.toFixed(1)}</span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-md ${ESTADO_DISP[d.estado] ?? "bg-gray-100 text-gray-500"}`}>{d.estado}</span>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Mediciones */}
      {tab === "mediciones" && (
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
          {site.mediciones.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Activity size={28} className="mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">No hay mediciones registradas.</p>
              <Link href={`/dashboard/testing/mediciones/nueva?siteId=${site.id}`} className="text-sm text-[#2D6A4F] hover:underline mt-1 inline-block">Registrar medición</Link>
            </div>
          ) : (
            site.mediciones.map((m) => (
              <div key={m.id} className="flex items-center px-5 py-3 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1A1A1A]">
                    <span className="font-medium">{m.tipo.replace(/_/g, " ")}</span>
                    {m.valor !== null && <span className="text-gray-500"> — {m.valor}{m.unidad ? ` ${m.unidad}` : ""}</span>}
                    {m.descripcion && <span className="text-gray-500"> — {m.descripcion}</span>}
                  </p>
                  {m.dispositivo && <p className="text-xs text-gray-400 mt-0.5">{m.dispositivo.nombre}</p>}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{fmtDT(m.fecha)}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Fotos */}
      {tab === "fotos" && (
        site.fotos.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md px-5 py-10 text-center">
            <Camera size={28} className="mx-auto text-gray-200 mb-2" />
            <p className="text-sm text-gray-400">No hay fotos.</p>
            <Link href={`/dashboard/testing/fotos/subir?siteId=${site.id}`} className="text-sm text-[#2D6A4F] hover:underline mt-1 inline-block">Subir fotos</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {site.fotos.map((foto) => (
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
          {site.incidencias.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <AlertTriangle size={28} className="mx-auto text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">No hay incidencias registradas.</p>
            </div>
          ) : (
            site.incidencias.map((inc) => (
              <div key={inc.id} className="flex items-start px-5 py-4 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${SEVERIDAD_BADGE[inc.severidad] ?? "bg-gray-100 text-gray-600"}`}>
                      {inc.severidad}
                    </span>
                    <span className="text-xs text-gray-500">{inc.tipo.replace(/_/g, " ")}</span>
                    {inc.dispositivo && <span className="text-xs text-gray-400">· {inc.dispositivo.nombre}</span>}
                    {inc.resuelta && <span className="text-xs text-emerald-600 font-medium">Resuelta</span>}
                  </div>
                  <p className="text-sm text-[#1A1A1A]">{inc.descripcion}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{fmtDT(inc.fecha)}</p>
                </div>
                <button
                  onClick={() => handleResolve(inc.id, !inc.resuelta)}
                  className={`flex-shrink-0 mt-0.5 transition-colors ${
                    inc.resuelta ? "text-emerald-500 hover:text-gray-400" : "text-gray-300 hover:text-emerald-500"
                  }`}
                >
                  {inc.resuelta ? <CheckCircle size={18} /> : <XCircle size={18} />}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal incidencia */}
      {incModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#1A4A3A]">Registrar incidencia</h2>
              <button onClick={() => setIncModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tipo</label>
                  <select value={incForm.tipo} onChange={(e) => setIncForm((f) => ({ ...f, tipo: e.target.value }))} className={inputClass}>
                    {["averia_dispositivo","vandalismo","condicion_climatica","fallo_conectividad","bateria_baja","resultado_inesperado","otro"].map((t) => (
                      <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Severidad</label>
                  <select value={incForm.severidad} onChange={(e) => setIncForm((f) => ({ ...f, severidad: e.target.value }))} className={inputClass}>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Dispositivo (opcional)</label>
                <select value={incForm.dispositivoId} onChange={(e) => setIncForm((f) => ({ ...f, dispositivoId: e.target.value }))} className={inputClass}>
                  <option value="">— Sin dispositivo específico</option>
                  {site.dispositivos.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción *</label>
                <textarea value={incForm.descripcion} onChange={(e) => setIncForm((f) => ({ ...f, descripcion: e.target.value }))} className={`${inputClass} resize-none`} rows={3} placeholder="Describe la incidencia..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Acción tomada</label>
                <input type="text" value={incForm.accionTomada} onChange={(e) => setIncForm((f) => ({ ...f, accionTomada: e.target.value }))} className={inputClass} placeholder="ej. Se revisó el cableado..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIncModalOpen(false)} className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2">Cancelar</button>
              <button onClick={handleCreateInc} disabled={saving || !incForm.descripcion} className="bg-[#2D6A4F] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50 font-medium">
                {saving ? "Guardando..." : "Registrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
