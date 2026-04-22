"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Eye, X, ChevronRight } from "lucide-react";

interface Formulario {
  id: string;
  tipo: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  empresa?: string | null;
  sector?: string | null;
  mensaje: string;
  estado: string;
  notas?: string | null;
  syncMautic: boolean;
  createdAt: Date | string;
}

type AllForms = {
  comercial: Formulario[];
  instalador: Formulario[];
  general: Formulario[];
  incidencia: Formulario[];
};

const TABS = [
  { label: "Comercial", value: "comercial" },
  { label: "OAX", value: "instalador" },
  { label: "General", value: "general" },
  { label: "Incidencias", value: "incidencia" },
] as const;

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

function formatFecha(iso: Date | string): string {
  const d = new Date(iso as string);
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function FormulariosClient({ allForms }: { allForms: AllForms }) {
  const router = useRouter();
  const [tab, setTab] = useState<keyof AllForms>("comercial");
  const [selected, setSelected] = useState<Formulario | null>(null);
  const [editEstado, setEditEstado] = useState("");
  const [editNotas, setEditNotas] = useState("");
  const [editSync, setEditSync] = useState(false);
  const [saving, setSaving] = useState(false);

  const forms = allForms[tab];

  function openDetail(form: Formulario) {
    setSelected(form);
    setEditEstado(form.estado);
    setEditNotas(form.notas || "");
    setEditSync(form.syncMautic);
  }

  function closeDetail() {
    setSelected(null);
  }

  const handleSave = useCallback(async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/formularios/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: editEstado, notas: editNotas, syncMautic: editSync }),
      });
      if (res.ok) {
        router.refresh();
        closeDetail();
      }
    } finally {
      setSaving(false);
    }
  }, [selected, editEstado, editNotas, editSync, router]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A4A3A]">Formularios</h1>

      {/* Tabs — scrollable on mobile */}
      <div className="flex gap-1 bg-gray-100 rounded-md p-1 w-fit mt-4 max-w-full overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-3 sm:px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
              tab === t.value
                ? "bg-white text-[#1A4A3A] font-medium shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-md mt-4 overflow-hidden">
        {forms.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-gray-400">
            No hay formularios en esta categoria.
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <ul className="md:hidden divide-y divide-gray-100">
              {forms.map((form) => (
                <li
                  key={form.id}
                  onClick={() => openDetail(form)}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate">{form.nombre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{form.empresa || form.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatFecha(form.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-md ${estadoBadge[form.estado] || "bg-gray-100 text-gray-600"}`}>
                      {form.estado.charAt(0).toUpperCase() + form.estado.slice(1)}
                    </span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop: table */}
            <table className="hidden md:table w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Fecha","Nombre","Empresa","Estado","Acciones"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr
                    key={form.id}
                    onClick={() => openDetail(form)}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-500">{formatFecha(form.createdAt)}</td>
                    <td className="px-4 py-3">{form.nombre}</td>
                    <td className="px-4 py-3">{form.empresa || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md ${estadoBadge[form.estado] || "bg-gray-100 text-gray-600"}`}>
                        {form.estado.charAt(0).toUpperCase() + form.estado.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); openDetail(form); }}
                        className="text-gray-400 hover:text-[#1A4A3A] transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Detail panel — fixed fullscreen on mobile, slide-over on desktop */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={closeDetail} />
          <div className="fixed inset-0 z-50 flex flex-col bg-white md:inset-auto md:right-0 md:top-0 md:h-full md:w-full md:max-w-md md:shadow-lg">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex items-center gap-3">
              <button onClick={closeDetail} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors md:hidden">
                <X size={18} />
              </button>
              <h2 className="text-base md:text-lg font-semibold text-[#1A4A3A] flex-1">Detalle del formulario</h2>
              <button onClick={closeDetail} className="hidden md:block text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
              {[
                { label: "Tipo", value: selected.tipo.charAt(0).toUpperCase() + selected.tipo.slice(1) },
                { label: "Nombre", value: selected.nombre },
                { label: "Email", value: selected.email },
                { label: "Telefono", value: selected.telefono || "—" },
                { label: "Empresa", value: selected.empresa || "—" },
                { label: "Sector", value: selected.sector || "—" },
                { label: "Fecha", value: formatFecha(selected.createdAt) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
                  <p className="text-sm text-[#1A1A1A] mt-1">{value}</p>
                </div>
              ))}

              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Mensaje</label>
                <p className="text-sm text-[#1A1A1A] mt-1 whitespace-pre-wrap">{selected.mensaje}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</label>
                <select
                  value={editEstado}
                  onChange={(e) => setEditEstado(e.target.value)}
                  className="mt-1 block w-full text-sm border border-gray-200 rounded-md px-3 py-2.5 bg-white text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                >
                  {ESTADOS.map((e) => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Notas</label>
                <textarea
                  value={editNotas}
                  onChange={(e) => setEditNotas(e.target.value)}
                  rows={4}
                  placeholder="Notas internas..."
                  className="mt-1 block w-full text-sm border border-gray-200 rounded-md px-3 py-2.5 bg-white text-[#1A1A1A] resize-none focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:border-[#2D6A4F]"
                />
              </div>

              {(selected.tipo === "comercial" || selected.tipo === "instalador") && (
                <div>
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Mautic</label>
                  <div className="mt-1">
                    {editSync ? (
                      <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md bg-green-50 text-green-700">
                        Sincronizado
                      </span>
                    ) : (
                      <button
                        onClick={() => setEditSync(true)}
                        className="border border-[#2D6A4F] text-[#2D6A4F] text-sm px-4 py-2.5 rounded-md hover:bg-[#F0F4F2] transition-colors w-full sm:w-auto"
                      >
                        Sincronizar con Mautic
                      </button>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-[#2D6A4F] text-white text-sm font-medium px-4 py-3 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50"
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
