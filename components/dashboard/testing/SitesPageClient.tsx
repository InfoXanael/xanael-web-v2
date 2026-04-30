"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, MapPin, ChevronRight, X } from "lucide-react";

interface Site {
  id: string;
  nombre: string;
  municipio: string;
  provincia: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string | null;
  _count: { dispositivos: number; mediciones: number; incidencias: number };
}

const ESTADO_BADGE: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  finalizado: "bg-gray-100 text-gray-600",
  pausado: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

const inputClass =
  "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] transition-colors bg-white";

export function SitesPageClient({ sites, total }: { sites: Site[]; total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nombre: "", municipio: "", provincia: "", direccion: "",
    coordenadas: "", descripcion: "", fechaInicio: "", estado: "activo",
  });

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`?${params.toString()}`));
  }

  async function handleCreate() {
    if (!form.nombre || !form.municipio || !form.provincia || !form.fechaInicio) return;
    setSaving(true);
    try {
      const res = await fetch("/api/testing/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalOpen(false);
        setForm({ nombre: "", municipio: "", provincia: "", direccion: "", coordenadas: "", descripcion: "", fechaInicio: "", estado: "activo" });
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A4A3A]">Sitios de testeo</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} sitio{total !== 1 ? "s" : ""} registrado{total !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 bg-[#2D6A4F] text-white text-sm px-3 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors"
        >
          <Plus size={14} /> Nuevo sitio
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          defaultValue={searchParams.get("estado") ?? ""}
          onChange={(e) => setFilter("estado", e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] bg-white"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="pausado">Pausado</option>
          <option value="finalizado">Finalizado</option>
        </select>
        {isPending && <span className="text-xs text-gray-400 self-center">Actualizando...</span>}
      </div>

      {/* Lista */}
      <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
        {sites.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <MapPin size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-sm font-medium text-gray-500">No hay sitios registrados</p>
            <p className="text-xs text-gray-400 mt-1">Crea el primer sitio de testeo para empezar a registrar datos</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 text-sm text-[#2D6A4F] hover:underline"
            >
              Crear sitio
            </button>
          </div>
        ) : (
          sites.map((site) => (
            <Link
              key={site.id}
              href={`/dashboard/testing/sites/${site.id}`}
              className="flex items-center px-5 py-4 hover:bg-gray-50/80 transition-colors gap-4 group"
            >
              <MapPin size={15} className="text-[#2D6A4F] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate group-hover:text-[#2D6A4F] transition-colors">
                  {site.nombre}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {site.municipio}, {site.provincia}
                  <span className="mx-1.5 text-gray-300">·</span>
                  Inicio: {formatDate(site.fechaInicio)}
                  {site.fechaFin && <> — Fin: {formatDate(site.fechaFin)}</>}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-xs text-gray-400">
                <span>{site._count.dispositivos} disp.</span>
                <span>{site._count.mediciones} med.</span>
                {site._count.incidencias > 0 && (
                  <span className="text-amber-500 font-medium">{site._count.incidencias} inc.</span>
                )}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${ESTADO_BADGE[site.estado] ?? "bg-gray-100 text-gray-600"}`}>
                {site.estado}
              </span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-[#2D6A4F] flex-shrink-0 transition-colors" />
            </Link>
          ))
        )}
      </div>

      {/* Modal crear sitio */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#1A4A3A]">Nuevo sitio de testeo</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nombre del sitio *</label>
                <input type="text" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} className={inputClass} placeholder="ej. Calle Mayor, Pamplona — Tramo A" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Municipio *</label>
                  <input type="text" value={form.municipio} onChange={(e) => setForm((f) => ({ ...f, municipio: e.target.value }))} className={inputClass} placeholder="ej. Pamplona" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Provincia *</label>
                  <input type="text" value={form.provincia} onChange={(e) => setForm((f) => ({ ...f, provincia: e.target.value }))} className={inputClass} placeholder="ej. Navarra" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Dirección</label>
                <input type="text" value={form.direccion} onChange={(e) => setForm((f) => ({ ...f, direccion: e.target.value }))} className={inputClass} placeholder="Calle Mayor 12, esquina..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Coordenadas</label>
                <input type="text" value={form.coordenadas} onChange={(e) => setForm((f) => ({ ...f, coordenadas: e.target.value }))} className={inputClass} placeholder="42.8166, -1.6435" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} className={`${inputClass} resize-none`} rows={2} placeholder="Contexto del sitio, tipo de zona..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Fecha inicio *</label>
                  <input type="date" value={form.fechaInicio} onChange={(e) => setForm((f) => ({ ...f, fechaInicio: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Estado</label>
                  <select value={form.estado} onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))} className={inputClass}>
                    <option value="activo">Activo</option>
                    <option value="pausado">Pausado</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)} className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2">Cancelar</button>
              <button
                onClick={handleCreate}
                disabled={saving || !form.nombre || !form.municipio || !form.provincia || !form.fechaInicio}
                className="bg-[#2D6A4F] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50 font-medium"
              >
                {saving ? "Creando..." : "Crear sitio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
