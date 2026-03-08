"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Plus, X } from "lucide-react";

interface Lead {
  id: string;
  nombre: string;
  empresa?: string | null;
  email?: string | null;
  telefono?: string | null;
  origen?: string | null;
  etapa: string;
  notas?: string | null;
  ultimoContacto?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LeadForm {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  origen: string;
  notas: string;
}

const STAGES = [
  { key: "lead", label: "Lead" },
  { key: "contactado", label: "Contactado" },
  { key: "reunion", label: "Reunión" },
  { key: "propuesta", label: "Propuesta" },
  { key: "cliente", label: "Cliente" },
];

const EMPTY_FORM: LeadForm = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  origen: "formulario",
  notas: "",
};

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return `${day} ${months[date.getMonth()]}`;
}

function origenBadgeClass(origen: string | null | undefined): string {
  switch (origen) {
    case "formulario":
      return "bg-blue-50 text-blue-600";
    case "feria":
      return "bg-purple-50 text-purple-600";
    case "manual":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [defaultEtapa, setDefaultEtapa] = useState("lead");
  const [saving, setSaving] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/pipeline");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function getLeadsByEtapa(etapa: string): Lead[] {
    return leads.filter((l) => l.etapa === etapa);
  }

  function openCreateModal(etapa: string) {
    setEditingLead(null);
    setForm(EMPTY_FORM);
    setDefaultEtapa(etapa);
    setModalOpen(true);
  }

  function openEditModal(lead: Lead) {
    setEditingLead(lead);
    setForm({
      nombre: lead.nombre,
      empresa: lead.empresa || "",
      email: lead.email || "",
      telefono: lead.telefono || "",
      origen: lead.origen || "formulario",
      notas: lead.notas || "",
    });
    setDefaultEtapa(lead.etapa);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingLead(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave() {
    if (!form.nombre.trim()) return;
    setSaving(true);

    try {
      if (editingLead) {
        const res = await fetch(`/api/pipeline/${editingLead.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: form.nombre,
            empresa: form.empresa || null,
            email: form.email || null,
            telefono: form.telefono || null,
            notas: form.notas || null,
          }),
        });
        if (res.ok) {
          const updated = await res.json();
          setLeads((prev) =>
            prev.map((l) => (l.id === updated.id ? updated : l))
          );
        }
      } else {
        const res = await fetch("/api/pipeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: form.nombre,
            empresa: form.empresa || null,
            email: form.email || null,
            telefono: form.telefono || null,
            origen: form.origen,
            etapa: defaultEtapa,
            notas: form.notas || null,
          }),
        });
        if (res.ok) {
          const created = await res.json();
          setLeads((prev) => [created, ...prev]);
        }
      }
      closeModal();
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setSaving(false);
    }
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const leadId = result.draggableId;
    const sourceEtapa = result.source.droppableId;
    const destEtapa = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceEtapa === destEtapa && sourceIndex === destIndex) return;

    // Optimistic update
    setLeads((prev) => {
      const updated = [...prev];
      const leadIndex = updated.findIndex((l) => l.id === leadId);
      if (leadIndex === -1) return prev;
      updated[leadIndex] = { ...updated[leadIndex], etapa: destEtapa };
      return updated;
    });

    // Persist to API
    try {
      await fetch(`/api/pipeline/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etapa: destEtapa }),
      });
    } catch (err) {
      console.error("Error updating lead stage:", err);
      // Revert on failure
      setLeads((prev) => {
        const reverted = [...prev];
        const leadIndex = reverted.findIndex((l) => l.id === leadId);
        if (leadIndex === -1) return prev;
        reverted[leadIndex] = { ...reverted[leadIndex], etapa: sourceEtapa };
        return reverted;
      });
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] transition-colors";

  return (
    <div>
      {/* Page header */}
      <h1 className="text-2xl font-bold text-[#1A4A3A]">Pipeline</h1>

      {/* Kanban board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = getLeadsByEtapa(stage.key);
            return (
              <div
                key={stage.key}
                className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-md flex flex-col max-h-[calc(100vh-200px)]"
              >
                {/* Column header */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1A4A3A]">
                      {stage.label}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                      {stageLeads.length}
                    </span>
                  </div>
                  <button
                    onClick={() => openCreateModal(stage.key)}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#2D6A4F] hover:bg-gray-50 rounded-md"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Column body — Droppable */}
                <Droppable droppableId={stage.key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex-1 overflow-y-auto p-2 space-y-2"
                    >
                      {stageLeads.map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => openEditModal(lead)}
                              className={`bg-gray-50 border border-gray-200 rounded-md p-3 cursor-grab active:cursor-grabbing hover:border-[#2D6A4F]/30 transition-colors ${
                                snapshot.isDragging
                                  ? "shadow-lg border-[#2D6A4F]/40"
                                  : ""
                              }`}
                            >
                              <div className="text-sm font-medium text-[#1A1A1A]">
                                {lead.nombre}
                              </div>
                              {lead.empresa && (
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {lead.empresa}
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-md ${origenBadgeClass(lead.origen)}`}
                                >
                                  {lead.origen || "manual"}
                                </span>
                                {lead.ultimoContacto && (
                                  <span className="text-xs text-gray-400">
                                    {formatDate(lead.ultimoContacto)}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg w-full max-w-md mx-4 overflow-hidden">
            {/* Modal header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1A4A3A]">
                {editingLead ? "Editar lead" : "Nuevo lead"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nombre: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Nombre del contacto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, empresa: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefono
                </label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, telefono: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origen
                </label>
                <select
                  value={form.origen}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, origen: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="formulario">Formulario</option>
                  <option value="feria">Feria</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas
                </label>
                <textarea
                  value={form.notas}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notas: e.target.value }))
                  }
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Notas adicionales..."
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.nombre.trim()}
                className="bg-[#2D6A4F] text-white text-sm px-4 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
