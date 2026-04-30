"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface Site {
  id: string;
  nombre: string;
  municipio: string;
}

interface Dispositivo {
  id: string;
  nombre: string;
  tipo: string;
}

const TIPOS_MEDICION = [
  "deteccion_roedor", "deteccion_insecto", "temperatura", "humedad",
  "consumo_cebo", "imagen_capturada", "actividad_pir", "alerta", "otro",
];

function NuevaMedicionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedSiteId = searchParams.get("siteId") ?? "";

  const [sites, setSites] = useState<Site[]>([]);
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    siteId: preselectedSiteId,
    dispositivoId: "",
    tipo: "deteccion_roedor",
    valor: "",
    unidad: "",
    descripcion: "",
    confianza: "",
    fuenteDatos: "manual",
    fecha: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    fetch("/api/testing/sites?limit=100").then((r) => r.json()).then((d) => setSites(d.sites ?? []));
  }, []);

  const fetchDispositivos = useCallback(async (siteId: string) => {
    if (!siteId) { setDispositivos([]); return; }
    const res = await fetch(`/api/testing/dispositivos?siteId=${siteId}&limit=100`);
    const data = await res.json();
    setDispositivos(data.dispositivos ?? []);
  }, []);

  useEffect(() => { fetchDispositivos(form.siteId); }, [form.siteId, fetchDispositivos]);

  async function handleSave() {
    if (!form.siteId || !form.tipo || !form.fecha) return;
    setSaving(true);
    try {
      const body = {
        siteId: form.siteId,
        dispositivoId: form.dispositivoId || null,
        tipo: form.tipo,
        valor: form.valor !== "" ? parseFloat(form.valor) : null,
        unidad: form.unidad || null,
        descripcion: form.descripcion || null,
        confianza: form.confianza !== "" ? parseFloat(form.confianza) : null,
        fuenteDatos: form.fuenteDatos,
        fecha: new Date(form.fecha).toISOString(),
      };
      const res = await fetch("/api/testing/mediciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          if (form.siteId) router.push(`/dashboard/testing/sites/${form.siteId}`);
          else router.push("/dashboard/testing");
        }, 1200);
      }
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2D6A4F] transition-colors";

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-[#1A4A3A]">Registrar medición</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sitio *</label>
          <select
            value={form.siteId}
            onChange={(e) => setForm((f) => ({ ...f, siteId: e.target.value, dispositivoId: "" }))}
            className={inputClass}
          >
            <option value="">— Seleccionar sitio</option>
            {sites.map((s) => <option key={s.id} value={s.id}>{s.nombre} ({s.municipio})</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dispositivo (opcional)</label>
          <select
            value={form.dispositivoId}
            onChange={(e) => setForm((f) => ({ ...f, dispositivoId: e.target.value }))}
            className={inputClass}
            disabled={!form.siteId}
          >
            <option value="">— Sin dispositivo específico</option>
            {dispositivos.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de medición *</label>
          <select
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
            className={inputClass}
          >
            {TIPOS_MEDICION.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor numérico</label>
            <input
              type="number"
              step="any"
              value={form.valor}
              onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))}
              className={inputClass}
              placeholder="ej. 23.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
            <input
              type="text"
              value={form.unidad}
              onChange={(e) => setForm((f) => ({ ...f, unidad: e.target.value }))}
              className={inputClass}
              placeholder="ej. °C, %, detecciones"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            className={inputClass}
            placeholder="Descripción o contexto de la medición"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confianza (0-1)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              max={1}
              value={form.confianza}
              onChange={(e) => setForm((f) => ({ ...f, confianza: e.target.value }))}
              className={inputClass}
              placeholder="ej. 0.95"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuente</label>
            <select
              value={form.fuenteDatos}
              onChange={(e) => setForm((f) => ({ ...f, fuenteDatos: e.target.value }))}
              className={inputClass}
            >
              <option value="manual">Manual</option>
              <option value="automatico_dispositivo">Automático (dispositivo)</option>
              <option value="automatico_api">Automático (API)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora *</label>
          <input
            type="datetime-local"
            value={form.fecha}
            onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving || !form.siteId || !form.tipo || !form.fecha || saved}
            className="flex items-center gap-2 bg-[#2D6A4F] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1A4A3A] transition-colors disabled:opacity-50"
          >
            {saved ? <><CheckCircle size={14} /> Registrado</> : saving ? "Guardando..." : "Registrar medición"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NuevaMedicionPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-400">Cargando...</div>}>
      <NuevaMedicionForm />
    </Suspense>
  );
}
