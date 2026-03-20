"use client";

import { useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Bug, CheckCircle, Camera, X, Plus, Trash2 } from "lucide-react";

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

const labelClass = "block text-xs font-medium text-white/60 mb-1.5";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";

interface Zone {
  id: string;
  calle: string;
  tipo_plaga: string;
  frecuencia: string;
  descripcion: string;
  fotos: File[];
  previews: string[];
}

function emptyZone(): Zone {
  return {
    id: Math.random().toString(36).slice(2),
    calle: "",
    tipo_plaga: "",
    frecuencia: "",
    descripcion: "",
    fotos: [],
    previews: [],
  };
}

// ─── Subcomponent: ZoneCard ───────────────────────────────────────────────────

interface ZoneCardProps {
  zone: Zone;
  index: number;
  canRemove: boolean;
  onChange: (patch: Partial<Zone>) => void;
  onRemove: () => void;
}

function ZoneCard({ zone, index, canRemove, onChange, onRemove }: ZoneCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    const combined = [...zone.fotos, ...incoming].slice(0, 5);
    onChange({ fotos: combined, previews: combined.map((f) => URL.createObjectURL(f)) });
    e.target.value = "";
  }

  function removePhoto(idx: number) {
    const fotos = zone.fotos.filter((_, i) => i !== idx);
    onChange({ fotos, previews: fotos.map((f) => URL.createObjectURL(f)) });
  }

  return (
    <div className="border border-white/15 rounded-md bg-white/5 p-5">
      {/* Zone header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/80 text-sm font-semibold">Zona {index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Eliminar zona
          </button>
        )}
      </div>

      {/* Calle */}
      <div>
        <label className={labelClass}>
          Zona / Calle propuesta <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          value={zone.calle}
          onChange={(e) => onChange({ calle: e.target.value })}
          placeholder="Ej: Calle Mayor, parque central..."
          className={inputClass}
        />
      </div>

      {/* Plaga + Frecuencia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className={labelClass}>
            Tipo de plaga <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={zone.tipo_plaga}
              onChange={(e) => onChange({ tipo_plaga: e.target.value })}
              className={selectClass}
            >
              <option value="" disabled className="text-gray-900">
                Selecciona
              </option>
              <option value="Roedores" className="text-gray-900">Roedores</option>
              <option value="Cucarachas" className="text-gray-900">Cucarachas</option>
              <option value="Hormigas" className="text-gray-900">Hormigas</option>
              <option value="Otras" className="text-gray-900">Otras</option>
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Frecuencia de incidencias <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={zone.frecuencia}
              onChange={(e) => onChange({ frecuencia: e.target.value })}
              className={selectClass}
            >
              <option value="" disabled className="text-gray-900">
                Selecciona
              </option>
              <option value="Diaria" className="text-gray-900">Diaria</option>
              <option value="Semanal" className="text-gray-900">Semanal</option>
              <option value="Mensual" className="text-gray-900">Mensual</option>
              <option value="Ocasional" className="text-gray-900">Ocasional</option>
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-4">
        <label className={labelClass}>Descripción adicional</label>
        <textarea
          rows={3}
          value={zone.descripcion}
          onChange={(e) => onChange({ descripcion: e.target.value })}
          placeholder="Histórico de incidencias, accesibilidad, observaciones..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Fotos */}
      <div className="mt-4">
        <label className={labelClass}>
          <Camera className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
          Fotos <span className="text-white/40">(opcional, máx. 5)</span>
        </label>

        {zone.fotos.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed border-white/20 rounded-md px-4 py-3 text-sm text-white/40 hover:border-white/35 hover:text-white/60 transition-colors text-center"
          >
            + Añadir fotos
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />

        {zone.previews.length > 0 && (
          <div className="mt-2 grid grid-cols-5 gap-2">
            {zone.previews.map((src, i) => (
              <div key={i} className="relative group aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PilotoPage() {
  const [personal, setPersonal] = useState({ nombre: "", cargo: "", municipio: "" });
  const [zones, setZones] = useState<Zone[]>([emptyZone()]);
  const [status, setStatus] = useState<FormStatus>("idle");

  function updatePersonal(patch: Partial<typeof personal>) {
    setPersonal((prev) => ({ ...prev, ...patch }));
  }

  function addZone() {
    setZones((prev) => [...prev, emptyZone()]);
  }

  function removeZone(id: string) {
    setZones((prev) => prev.filter((z) => z.id !== id));
  }

  function updateZone(id: string, patch: Partial<Zone>) {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, ...patch } : z)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData();
    fd.set("nombre", personal.nombre);
    fd.set("cargo", personal.cargo);
    fd.set("municipio", personal.municipio);
    fd.set(
      "zonas_meta",
      JSON.stringify(
        zones.map(({ calle, tipo_plaga, frecuencia, descripcion }) => ({
          zona: calle,
          tipo_plaga,
          frecuencia,
          descripcion: descripcion || undefined,
        }))
      )
    );
    zones.forEach((zone, i) => {
      zone.fotos.forEach((f) => fd.append(`zona_${i}_fotos`, f));
    });

    try {
      const res = await fetch("/api/piloto", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("success");
      setPersonal({ nombre: "", cargo: "", municipio: "" });
      setZones([emptyZone()]);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-24 bg-[#F0F4F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">Zonas Piloto</span>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-md bg-[#2D6A4F] flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-[#2D6A4F] uppercase tracking-wider">
            Programa Municipal
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A4A3A] tracking-tight">
          Solicitud de Zona Piloto
        </h1>
        <p className="mt-4 text-gray-500 text-lg max-w-2xl">
          Propón tu municipio para el programa piloto XANAEL. Instalamos el bordillo técnico
          en zonas con incidencia de plagas registrada, sin coste para el ayuntamiento.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: MapPin, title: "Sin coste inicial", desc: "Instalación gratuita en la zona piloto seleccionada" },
            { icon: Bug, title: "Monitoreo continuo", desc: "Datos de actividad de plagas en tiempo real durante el piloto" },
            { icon: CheckCircle, title: "Informe técnico", desc: "Resultado del piloto con métricas y recomendaciones" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-md p-5 border border-gray-100">
                <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                <h3 className="mt-3 text-sm font-semibold text-[#1A4A3A]">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </header>

      {/* Form card */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            backgroundImage: "url('/images/textura-hormigon.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A4A3A]/[0.92]" />
          <div className="relative p-8 md:p-12">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-lg py-8"
                >
                  <CheckCircle className="w-10 h-10 text-white/80" strokeWidth={1.5} />
                  <p className="mt-4 text-white text-lg font-semibold">
                    Solicitud recibida correctamente
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Nos pondremos en contacto contigo en un plazo de 5 días hábiles para
                    valorar las zonas propuestas.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors"
                  >
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="max-w-2xl"
                >
                  {status === "error" && (
                    <div className="mb-6 bg-red-500/20 border border-red-400/30 text-white text-sm rounded-md p-3">
                      Ha ocurrido un error. Por favor, inténtalo de nuevo.
                    </div>
                  )}

                  {/* ── Datos personales ── */}
                  <h2 className="text-white font-semibold text-base mb-4">Datos de contacto</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Nombre completo <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={personal.nombre}
                        onChange={(e) => updatePersonal({ nombre: e.target.value })}
                        placeholder="Tu nombre completo"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Cargo <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={personal.cargo}
                        onChange={(e) => updatePersonal({ cargo: e.target.value })}
                        placeholder="Ej: Técnico de medio ambiente"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className={labelClass}>
                      Municipio <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={personal.municipio}
                      onChange={(e) => updatePersonal({ municipio: e.target.value })}
                      placeholder="Nombre del municipio"
                      className={inputClass}
                    />
                  </div>

                  {/* ── Separador ── */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-white/15" />
                    <span className="text-white/50 text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                      Zonas con incidencias
                    </span>
                    <div className="flex-1 h-px bg-white/15" />
                  </div>

                  {/* ── Zone list ── */}
                  <div className="flex flex-col gap-4">
                    {zones.map((zone, i) => (
                      <ZoneCard
                        key={zone.id}
                        zone={zone}
                        index={i}
                        canRemove={zones.length > 1}
                        onChange={(patch) => updateZone(zone.id, patch)}
                        onRemove={() => removeZone(zone.id)}
                      />
                    ))}
                  </div>

                  {/* ── Add zone ── */}
                  <button
                    type="button"
                    onClick={addZone}
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-white/20 rounded-md px-4 py-3 text-sm text-white/60 hover:border-white/40 hover:text-white/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Añadir zona
                  </button>

                  {/* ── RGPD ── */}
                  <label className="flex items-start gap-3 mt-8 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
                    />
                    <span className="text-xs text-white/60 leading-relaxed">
                      Acepto la{" "}
                      <Link
                        href="/politica-privacidad"
                        className="underline hover:text-white/80 transition-colors"
                      >
                        política de privacidad
                      </Link>{" "}
                      y consiento el tratamiento de mis datos para la gestión de esta solicitud.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar solicitud"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
