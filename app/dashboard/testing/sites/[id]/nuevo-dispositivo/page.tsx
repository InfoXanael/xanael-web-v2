"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

const TIPOS = [
  "sensor_pir", "camara", "trampa_mecanica", "trampa_co2", "cebo_inteligente",
  "sensor_temperatura", "sensor_humedad", "telemetria", "otro",
];

const CONECTIVIDADES = ["wifi", "lora", "4g", "bluetooth", "sin_conectividad"];
const POSICIONES = ["interior_camara", "orificio_frontal", "tapa_superior", "exterior"];

export default function NuevoDispositivoPage() {
  const { id: siteId } = useParams<{ id: string }>();
  const router = useRouter();
  const [siteNombre, setSiteNombre] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    fabricante: "",
    modelo: "",
    tipo: "sensor_pir",
    conectividad: "",
    numeroSerie: "",
    posicionBordillo: "",
    fechaInstalacion: new Date().toISOString().slice(0, 10),
    estado: "activo",
    notas: "",
  });

  useEffect(() => {
    fetch(`/api/testing/sites/${siteId}`)
      .then((r) => r.json())
      .then((d) => setSiteNombre(d.nombre ?? ""));
  }, [siteId]);

  async function handleSave() {
    if (!form.nombre || !form.tipo || !form.fechaInstalacion) return;
    setSaving(true);
    try {
      const res = await fetch("/api/testing/dispositivos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          nombre: form.nombre,
          fabricante: form.fabricante || null,
          modelo: form.modelo || null,
          tipo: form.tipo,
          conectividad: form.conectividad || null,
          numeroSerie: form.numeroSerie || null,
          posicionBordillo: form.posicionBordillo || null,
          fechaInstalacion: form.fechaInstalacion,
          estado: form.estado,
          notas: form.notas || null,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => router.push(`/dashboard/testing/sites/${siteId}`), 1200);
      }
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] transition-colors";

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1A4A3A]">Nuevo dispositivo</h1>
          {siteNombre && <p className="text-sm text-gray-500 mt-0.5">{siteNombre}</p>}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-6 space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            className={inputClass}
            placeholder="ej. Anticimex Smart Eye #1"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fabricante</label>
            <input
              type="text"
              value={form.fabricante}
              onChange={(e) => setForm((f) => ({ ...f, fabricante: e.target.value }))}
              className={inputClass}
              placeholder="ej. Anticimex"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input
              type="text"
              value={form.modelo}
              onChange={(e) => setForm((f) => ({ ...f, modelo: e.target.value }))}
              className={inputClass}
              placeholder="ej. Smart Eye v2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <select value={form.tipo} onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))} className={inputClass}>
            {TIPOS.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conectividad</label>
            <select value={form.conectividad} onChange={(e) => setForm((f) => ({ ...f, conectividad: e.target.value }))} className={inputClass}>
              <option value="">— Sin especificar</option>
              {CONECTIVIDADES.map((c) => <option key={c} value={c}>{c.replace(/_/g, " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posición en bordillo</label>
            <select value={form.posicionBordillo} onChange={(e) => setForm((f) => ({ ...f, posicionBordillo: e.target.value }))} className={inputClass}>
              <option value="">— Sin especificar</option>
              {POSICIONES.map((p) => <option key={p} value={p}>{p.replace(/_/g, " ")}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de serie</label>
          <input
            type="text"
            value={form.numeroSerie}
            onChange={(e) => setForm((f) => ({ ...f, numeroSerie: e.target.value }))}
            className={inputClass}
            placeholder="SN-XXXXXXX"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha instalación *</label>
            <input
              type="date"
              value={form.fechaInstalacion}
              onChange={(e) => setForm((f) => ({ ...f, fechaInstalacion: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select value={form.estado} onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))} className={inputClass}>
              <option value="activo">Activo</option>
              <option value="en_revision">En revisión</option>
              <option value="averiado">Averiado</option>
              <option value="retirado">Retirado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
          <textarea
            value={form.notas}
            onChange={(e) => setForm((f) => ({ ...f, notas: e.target.value }))}
            className={`${inputClass} resize-none`}
            rows={2}
            placeholder="Observaciones de instalación, particularidades..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving || !form.nombre || !form.tipo || !form.fechaInstalacion || saved}
            className="flex items-center gap-2 bg-[#2D6A4F] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50"
          >
            {saved ? <><CheckCircle size={14} /> Creado</> : saving ? "Guardando..." : "Crear dispositivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
