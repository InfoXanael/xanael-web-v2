"use client";

import { useEffect, useState, useCallback } from "react";
import { Eye, X } from "lucide-react";

interface Formulario {
  id: string;
  tipo: string;
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  sector?: string;
  mensaje: string;
  estado: string;
  notas?: string;
  syncMautic: boolean;
  createdAt: string;
}

const TABS = [
  { label: "Comercial", value: "comercial" },
  { label: "OAX", value: "instalador" },
  { label: "General", value: "general" },
  { label: "Incidencias", value: "incidencia" },
];

const ESTADOS = [
  { label: "Nuevo", value: "nuevo" },
  { label: "Leido", value: "leido" },
  { label: "Gestion", value: "gestion" },
  { label: "Cerrado", value: "cerrado" },
];

const estadoBadge: Record<string, string> = {
  nuevo: "bg-blue-50 text-blue-700",
  leido: "bg-gray-100 text-gray-600",
  gestion: "bg-yellow-50 text-yellow-700",
  cerrado: "bg-green-50 text-green-700",
};

function formatFecha(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  const months = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function FormulariosPage() {
  const [tab, setTab] = useState("comercial");
  const [forms, setForms] = useState<Formulario[]>([]);
  const [selected, setSelected] = useState<Formulario | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields in the detail panel
  const [editEstado, setEditEstado] = useState("");
  const [editNotas, setEditNotas] = useState("");
  const [editSync, setEditSync] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchForms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/formularios?tipo=${tab}`);
      if (res.ok) {
        const data = await res.json();
        setForms(data);
      }
    } catch (err) {
      console.error("Error fetching formularios:", err);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  function openDetail(form: Formulario) {
    setSelected(form);
    setEditEstado(form.estado);
    setEditNotas(form.notas || "");
    setEditSync(form.syncMautic);
  }

  function closeDetail() {
    setSelected(null);
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/formularios/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado: editEstado,
          notas: editNotas,
          syncMautic: editSync,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelected(updated);
        await fetchForms();
      }
    } catch (err) {
      console.error("Error saving formulario:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Page header */}
      <h1 className="text-2xl font-bold text-[#1A4A3A]">Formularios</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-md p-1 w-fit mt-4">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              tab === t.value
                ? "bg-white text-[#1A4A3A] font-medium shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-md mt-4 overflow-hidden">
        {loading ? (
          <div className="px-4 py-12 text-center text-sm text-gray-400">
            Cargando formularios...
          </div>
        ) : forms.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-gray-400">
            No hay formularios en esta categoria.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr
                  key={form.id}
                  onClick={() => openDetail(form)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-gray-500">
                    {formatFecha(form.createdAt)}
                  </td>
                  <td className="px-4 py-3">{form.nombre}</td>
                  <td className="px-4 py-3">{form.empresa || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md ${
                        estadoBadge[form.estado] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {form.estado.charAt(0).toUpperCase() + form.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetail(form);
                      }}
                      className="text-gray-400 hover:text-[#1A4A3A] transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over detail panel */}
      {selected && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeDetail}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 overflow-y-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1A4A3A]">
                Detalle del formulario
              </h2>
              <button
                onClick={closeDetail}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-4">
              {/* Tipo */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tipo
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">
                  {selected.tipo.charAt(0).toUpperCase() + selected.tipo.slice(1)}
                </p>
              </div>

              {/* Nombre */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Nombre
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">{selected.nombre}</p>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">{selected.email}</p>
              </div>

              {/* Telefono */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Telefono
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">
                  {selected.telefono || "—"}
                </p>
              </div>

              {/* Empresa */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Empresa
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">
                  {selected.empresa || "—"}
                </p>
              </div>

              {/* Sector */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Sector
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">
                  {selected.sector || "—"}
                </p>
              </div>

              {/* Mensaje */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Mensaje
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1 whitespace-pre-wrap">
                  {selected.mensaje}
                </p>
              </div>

              {/* Fecha */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fecha
                </label>
                <p className="text-sm text-[#1A1A1A] mt-1">
                  {formatFecha(selected.createdAt)}
                </p>
              </div>

              {/* Estado selector */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Estado
                </label>
                <select
                  value={editEstado}
                  onChange={(e) => setEditEstado(e.target.value)}
                  className="mt-1 block w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                >
                  {ESTADOS.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notas */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Notas
                </label>
                <textarea
                  value={editNotas}
                  onChange={(e) => setEditNotas(e.target.value)}
                  rows={4}
                  placeholder="Notas internas..."
                  className="mt-1 block w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white text-[#1A1A1A] resize-none focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                />
              </div>

              {/* Mautic sync — only for comercial / instalador */}
              {(selected.tipo === "comercial" || selected.tipo === "instalador") && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Mautic
                  </label>
                  <div className="mt-1">
                    {editSync ? (
                      <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md bg-green-50 text-green-700">
                        Sincronizado
                      </span>
                    ) : (
                      <button
                        onClick={() => setEditSync(true)}
                        className="border border-[#2D6A4F] text-[#2D6A4F] text-sm px-4 py-2 rounded-md hover:bg-[#F0F4F2] transition-colors"
                      >
                        Sincronizar con Mautic
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#2D6A4F] text-white text-sm px-4 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
