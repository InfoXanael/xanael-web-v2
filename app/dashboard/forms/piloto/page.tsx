"use client";

import { useEffect, useState, useCallback } from "react";
import { X, MapPin, Bug, Clock, FileText, Image as ImageIcon, Tag, Download, ChevronRight } from "lucide-react";

interface Zona {
  zona: string;
  tipo_plaga: string;
  frecuencia: string;
  tipo_ubicacion?: string;
  prioridad?: string;
  descripcion?: string;
  fotos: string[];
}

interface PilotoSubmission {
  id: string;
  nombre: string;
  cargo: string;
  municipio: string;
  zonas: Zona[];
  interesesControl: string[];
  estado: string;
  createdAt: string;
}

const ESTADOS = [
  { label: "Nuevo", value: "nuevo" },
  { label: "Revisado", value: "revisado" },
  { label: "Aprobado", value: "aprobado" },
  { label: "Descartado", value: "descartado" },
];

const estadoBadge: Record<string, string> = {
  nuevo: "bg-blue-50 text-blue-700 border-blue-100",
  revisado: "bg-yellow-50 text-yellow-700 border-yellow-100",
  aprobado: "bg-green-50 text-green-700 border-green-100",
  descartado: "bg-gray-100 text-gray-500 border-gray-200",
};

function formatFecha(iso: string): string {
  const d = new Date(iso);
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function PilotoFormsPage() {
  const [submissions, setSubmissions] = useState<PilotoSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PilotoSubmission | null>(null);
  const [editEstado, setEditEstado] = useState("");
  const [saving, setSaving] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/piloto");
      if (res.ok) setSubmissions(await res.json());
    } catch (err) {
      console.error("[piloto dashboard] fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  function openDetail(sub: PilotoSubmission) {
    setSelected(sub);
    setEditEstado(sub.estado);
  }

  async function handleExportPdf() {
    if (!selected) return;
    setExportingPdf(true);
    try {
      const res = await fetch(`/api/piloto/${selected.id}/pdf`);
      if (!res.ok) throw new Error("Error generando PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `piloto_${selected.municipio.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("[piloto] export pdf error:", err);
    } finally {
      setExportingPdf(false);
    }
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/piloto/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: editEstado }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelected(updated);
        setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      }
    } catch (err) {
      console.error("[piloto dashboard] save error:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex gap-6 h-full">

      {/* ── Table (hidden on mobile when detail is open) ── */}
      <div className={`flex flex-col min-w-0 transition-all duration-200 ${selected ? "hidden md:flex md:flex-1" : "w-full"}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1A4A3A]">Piloto</h1>
            <p className="text-sm text-gray-400 mt-0.5">Solicitudes de zona piloto municipal</p>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-md">
            {submissions.length} solicitud{submissions.length !== 1 ? "es" : ""}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-md overflow-hidden flex-1">
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">Cargando solicitudes...</div>
          ) : submissions.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">No hay solicitudes todavía.</div>
          ) : (
            <>
              {/* Mobile cards */}
              <ul className="md:hidden divide-y divide-gray-100">
                {submissions.map((sub) => {
                  const badge = estadoBadge[sub.estado] ?? estadoBadge.nuevo;
                  return (
                    <li
                      key={sub.id}
                      onClick={() => openDetail(sub)}
                      className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">{sub.nombre}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{sub.municipio}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatFecha(sub.createdAt)} · {sub.zonas?.length ?? 0} zona{(sub.zonas?.length ?? 0) !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${badge}`}>
                          {ESTADOS.find((e) => e.value === sub.estado)?.label ?? sub.estado}
                        </span>
                        <ChevronRight size={14} className="text-gray-300" />
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Desktop table */}
              <table className="hidden md:table w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Municipio</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Zonas</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => {
                    const isActive = selected?.id === sub.id;
                    const badge = estadoBadge[sub.estado] ?? estadoBadge.nuevo;
                    return (
                      <tr
                        key={sub.id}
                        onClick={() => openDetail(sub)}
                        className={`border-b border-gray-100 cursor-pointer transition-colors ${
                          isActive ? "bg-[#F0F4F2] border-l-2 border-l-[#2D6A4F]" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatFecha(sub.createdAt)}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-[#1A1A1A]">{sub.nombre}</p>
                          <p className="text-xs text-gray-400">{sub.cargo}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{sub.municipio}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F0F4F2] text-[#2D6A4F] text-xs font-semibold">
                            {sub.zonas?.length ?? 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${badge}`}>
                            {ESTADOS.find((e) => e.value === sub.estado)?.label ?? sub.estado}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      {/* ── Detail panel: fullscreen on mobile, side panel on desktop ── */}
      {selected && (
        <>
          {/* Desktop backdrop — not needed on mobile (fullscreen) */}
          <div className="hidden md:block" />

          <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden md:static md:inset-auto md:z-auto md:w-[420px] md:flex-shrink-0 md:border md:border-gray-200 md:rounded-md">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-sm font-semibold text-[#1A1A1A]">Detalle de solicitud</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportPdf}
                  disabled={exportingPdf}
                  title="Exportar PDF"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2D6A4F] border border-[#2D6A4F]/30 rounded-md hover:bg-[#F0F4F2] transition-colors disabled:opacity-50"
                >
                  <Download size={13} />
                  {exportingPdf ? "Generando..." : "PDF"}
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-5">
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Datos de contacto</h3>
                <div className="space-y-2">
                  {[
                    { label: "Nombre", value: selected.nombre, bold: true },
                    { label: "Cargo", value: selected.cargo, bold: false },
                    { label: "Municipio", value: selected.municipio, bold: true },
                    { label: "Fecha", value: formatFecha(selected.createdAt), bold: false },
                  ].map(({ label, value, bold }) => (
                    <div key={label} className="flex justify-between text-sm gap-4">
                      <span className="text-gray-500 flex-shrink-0">{label}</span>
                      <span className={`text-right ${bold ? "font-medium text-[#1A1A1A]" : "text-gray-600"}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="border-t border-gray-100" />

              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Zonas propuestas ({selected.zonas?.length ?? 0})
                </h3>
                <div className="space-y-4">
                  {(selected.zonas ?? []).map((zona, i) => (
                    <div key={i} className="bg-[#F0F4F2] rounded-md p-4 space-y-2.5">
                      <p className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wide">Zona {i + 1}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="text-[#1A1A1A] font-medium">{zona.zona}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Bug size={12} className="text-gray-400" />{zona.tipo_plaga}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock size={12} className="text-gray-400" />{zona.frecuencia}
                        </div>
                        {zona.tipo_ubicacion && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <MapPin size={12} className="text-gray-400" />{zona.tipo_ubicacion}
                          </div>
                        )}
                        {zona.prioridad && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              zona.prioridad === "Alta" ? "bg-red-400" :
                              zona.prioridad === "Media" ? "bg-yellow-400" : "bg-green-400"
                            }`} />
                            Prioridad {zona.prioridad}
                          </div>
                        )}
                      </div>
                      {zona.descripcion && (
                        <div className="flex items-start gap-1.5 text-xs text-gray-500">
                          <FileText size={12} className="text-gray-400 mt-0.5 shrink-0" />
                          <span>{zona.descripcion}</span>
                        </div>
                      )}
                      {zona.fotos && zona.fotos.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mb-1.5">
                            <ImageIcon size={11} />
                            {zona.fotos.length} foto{zona.fotos.length !== 1 ? "s" : ""}
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                            {zona.fotos.map((src, fi) => (
                              <button
                                key={fi}
                                type="button"
                                onClick={() => setLightbox(src)}
                                className="aspect-square rounded overflow-hidden hover:opacity-80 active:opacity-70 transition-opacity"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt={`Foto ${fi + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {selected.interesesControl?.length > 0 && (
                <>
                  <div className="border-t border-gray-100" />
                  <section>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Otros tipos de control</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.interesesControl.map((interes) => (
                        <span key={interes} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F0F4F2] text-[#2D6A4F] text-xs font-medium">
                          <Tag size={10} />{interes}
                        </span>
                      ))}
                    </div>
                  </section>
                </>
              )}

              <div className="border-t border-gray-100" />

              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Estado</h3>
                <div className="flex gap-2 flex-wrap">
                  {ESTADOS.map((e) => (
                    <button
                      key={e.value}
                      type="button"
                      onClick={() => setEditEstado(e.value)}
                      className={`px-3 py-2 text-xs rounded-md border transition-colors ${
                        editEstado === e.value
                          ? "bg-[#1A4A3A] text-white border-[#1A4A3A]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#2D6A4F]/40"
                      }`}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="px-4 md:px-5 py-4 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={handleSave}
                disabled={saving || editEstado === selected.estado}
                className="w-full bg-[#1A4A3A] text-white text-sm font-medium py-3 rounded-md hover:bg-[#153D30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/85 z-[60] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Foto ampliada"
            className="max-w-full max-h-full object-contain rounded-md"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
