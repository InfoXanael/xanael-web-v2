"use client";

import { useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Bug, Camera, CheckCircle, X } from "lucide-react";

const inputClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

const labelClass = "block text-xs font-medium text-white/60 mb-1.5";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function PilotoPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fotos, setFotos] = useState<File[]>([]);
  const [fotoPreviews, setFotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    const combined = [...fotos, ...incoming].slice(0, 5);
    setFotos(combined);
    setFotoPreviews(combined.map((f) => URL.createObjectURL(f)));
    // Reset input so the same file can be re-added after removal
    e.target.value = "";
  }

  function removePhoto(index: number) {
    const next = fotos.filter((_, i) => i !== index);
    setFotos(next);
    setFotoPreviews(next.map((f) => URL.createObjectURL(f)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    // Replace the file input entries with the controlled state
    fd.delete("fotos");
    fotos.forEach((f) => fd.append("fotos", f));

    try {
      const res = await fetch("/api/piloto", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFotos([]);
      setFotoPreviews([]);
      formRef.current?.reset();
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
          Propón tu municipio para el programa piloto XANAEL. Instalamos el
          bordillo técnico en zonas con incidencia de plagas registrada, sin
          coste para el ayuntamiento.
        </p>

        {/* Value props */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: MapPin,
              title: "Sin coste inicial",
              desc: "Instalación gratuita en la zona piloto seleccionada",
            },
            {
              icon: Bug,
              title: "Monitoreo continuo",
              desc: "Datos de actividad de plagas en tiempo real durante el piloto",
            },
            {
              icon: CheckCircle,
              title: "Informe técnico",
              desc: "Resultado del piloto con métricas y recomendaciones",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-md p-5 border border-gray-100"
              >
                <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                <h3 className="mt-3 text-sm font-semibold text-[#1A4A3A]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
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
          <div className="relative p-8 md:p-12 max-w-2xl">
            <h2 className="text-white font-semibold text-lg mb-6">
              Datos de la solicitud
            </h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="py-8"
                >
                  <CheckCircle
                    className="w-10 h-10 text-white/80"
                    strokeWidth={1.5}
                  />
                  <p className="mt-4 text-white text-lg font-semibold">
                    Solicitud recibida correctamente
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Nos pondremos en contacto contigo en un plazo de 5 días
                    hábiles para valorar la zona propuesta.
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
                  ref={formRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                >
                  {status === "error" && (
                    <div className="mb-4 bg-red-500/20 border border-red-400/30 text-white text-sm rounded-md p-3">
                      Ha ocurrido un error. Por favor, inténtalo de nuevo.
                    </div>
                  )}

                  {/* Nombre + Cargo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className={labelClass}>
                        Nombre completo{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        required
                        placeholder="Tu nombre completo"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cargo" className={labelClass}>
                        Cargo <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="cargo"
                        type="text"
                        name="cargo"
                        required
                        placeholder="Ej: Técnico de medio ambiente"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Municipio */}
                  <div className="mt-4">
                    <label htmlFor="municipio" className={labelClass}>
                      Municipio <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="municipio"
                      type="text"
                      name="municipio"
                      required
                      placeholder="Nombre del municipio"
                      className={inputClass}
                    />
                  </div>

                  {/* Zona */}
                  <div className="mt-4">
                    <label htmlFor="zona" className={labelClass}>
                      Zona / Calle propuesta{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="zona"
                      type="text"
                      name="zona"
                      required
                      placeholder="Ej: Calle Mayor, parque central..."
                      className={inputClass}
                    />
                  </div>

                  {/* Plaga + Frecuencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="tipo_plaga" className={labelClass}>
                        Tipo de plaga detectada{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="tipo_plaga"
                          name="tipo_plaga"
                          required
                          defaultValue=""
                          className={selectClass}
                        >
                          <option value="" disabled className="text-gray-900">
                            Selecciona
                          </option>
                          <option value="Roedores" className="text-gray-900">
                            Roedores
                          </option>
                          <option value="Cucarachas" className="text-gray-900">
                            Cucarachas
                          </option>
                          <option value="Hormigas" className="text-gray-900">
                            Hormigas
                          </option>
                          <option value="Otras" className="text-gray-900">
                            Otras
                          </option>
                        </select>
                        <svg
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="frecuencia" className={labelClass}>
                        Frecuencia de incidencias{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="frecuencia"
                          name="frecuencia"
                          required
                          defaultValue=""
                          className={selectClass}
                        >
                          <option value="" disabled className="text-gray-900">
                            Selecciona
                          </option>
                          <option value="Diaria" className="text-gray-900">
                            Diaria
                          </option>
                          <option value="Semanal" className="text-gray-900">
                            Semanal
                          </option>
                          <option value="Mensual" className="text-gray-900">
                            Mensual
                          </option>
                          <option value="Ocasional" className="text-gray-900">
                            Ocasional
                          </option>
                        </select>
                        <svg
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mt-4">
                    <label htmlFor="descripcion" className={labelClass}>
                      Descripción adicional
                    </label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      rows={4}
                      placeholder="Describe la situación de la zona, histórico de incidencias, accesibilidad..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Fotos */}
                  <div className="mt-4">
                    <label className={labelClass}>
                      <Camera className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                      Fotos de la zona{" "}
                      <span className="text-white/40">(opcional, máx. 5)</span>
                    </label>

                    {fotos.length < 5 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border border-dashed border-white/25 rounded-md px-4 py-4 text-sm text-white/50 hover:border-white/40 hover:text-white/70 transition-colors text-center"
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
                      onChange={handleFileChange}
                    />

                    {fotoPreviews.length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {fotoPreviews.map((src, i) => (
                          <div key={i} className="relative group aspect-square">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Foto ${i + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
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

                  {/* RGPD */}
                  <label className="flex items-start gap-3 mt-6 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rgpd"
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
                      y consiento el tratamiento de mis datos para la gestión de
                      esta solicitud.
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
