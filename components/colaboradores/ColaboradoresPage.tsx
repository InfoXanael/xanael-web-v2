"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, HardHat, HelpCircle } from "lucide-react";
import ManifestoSection from "@/components/home/ManifestoSection";
import Newsletter from "@/components/home/Newsletter";

/* ───────── diagram nodes ───────── */

const nodes = [
  { icon: Truck, label: "Distribuidor", desc: "Distribuye e impulsa XANAEL en tu zona", interest: "distribuidor" },
  { icon: HardHat, label: "Instalador", desc: "Instala y mantén el sistema", interest: "instalador" },
  { icon: HelpCircle, label: "Otro", desc: "¿Tienes otra forma de colaborar?", interest: "otro" },
];

/* ───────── steps ───────── */

const steps = [
  { num: "1.", text: "Descubre qué tipo de colaboración encaja contigo" },
  { num: "2.", text: "Rellena el formulario de contacto" },
  { num: "3.", text: "Nuestro equipo se pondrá en contacto contigo" },
];

/* ───────── input classes ───────── */

const inputClass =
  "w-full bg-white/[0.08] border border-white/30 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-white/[0.08] border border-white/30 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

/* ───────── component ───────── */

export default function ColaboradoresPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectAndScroll = (val: string) => {
    if (!interests.includes(val)) {
      setInterests((prev) => [...prev, val]);
    }
    setTimeout(() => {
      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="pt-24 bg-[#F0F4F2] min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">Colaboradores</span>
        </nav>
      </div>

      {/* ── Header ── */}
      <header className="max-w-7xl mx-auto px-6 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A4A3A] tracking-tight leading-tight max-w-4xl"
        >
          Red de Colaboradores
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl"
        >
          Descubre cómo puedes colaborar con XANAEL en tu zona.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={scrollToForm}
          className="mt-8 inline-block text-sm font-semibold bg-[#1A1A1A] text-white px-7 py-3 rounded-md hover:bg-[#333] transition-colors duration-300"
        >
          Unirme como colaborador
        </motion.button>
      </header>

      {/* ── Diagram ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div>
          {/* SVG diagram - desktop */}
          <div className="hidden md:block">
            <svg viewBox="0 0 800 380" className="w-full max-w-3xl mx-auto" fill="none">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#2D6A4F" />
                </marker>
              </defs>
              {/* Left arrow: center → distribuidor */}
              <line x1="320" y1="140" x2="165" y2="225" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowhead)" />
              {/* Bottom arrow: center → instalador */}
              <line x1="400" y1="175" x2="400" y2="232" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowhead)" />
              {/* Right arrow: center → otro */}
              <line x1="480" y1="140" x2="635" y2="225" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </svg>

            {/* Overlay positioned elements */}
            <div className="relative -mt-[380px] h-[380px] max-w-3xl mx-auto">
              {/* Center circle */}
              <div className="absolute left-1/2 top-[40px] -translate-x-1/2 w-[140px] h-[140px] rounded-full bg-[#2D6A4F] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg tracking-wide">XANAEL</span>
              </div>

              {/* Left node */}
              <div className="absolute left-[2%] top-[210px] group cursor-pointer" onClick={() => selectAndScroll("distribuidor")}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#D8DDD9] flex items-center justify-center mx-auto group-hover:bg-[#C8CEC9] group-hover:scale-[1.15] transition-all duration-300 ease-out">
                  <Truck className="w-6 h-6 text-[#2D6A4F]" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2D6A4F] text-center">Distribuidor</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">Distribuye e impulsa XANAEL en tu zona</p>
              </div>

              {/* Center node */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[265px] group cursor-pointer" onClick={() => selectAndScroll("instalador")}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#D8DDD9] flex items-center justify-center mx-auto group-hover:bg-[#C8CEC9] group-hover:scale-[1.15] transition-all duration-300 ease-out">
                  <HardHat className="w-6 h-6 text-[#2D6A4F]" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2D6A4F] text-center">Instalador</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">Instala y mantén el sistema</p>
              </div>

              {/* Right node */}
              <div className="absolute right-[2%] top-[210px] group cursor-pointer" onClick={() => selectAndScroll("otro")}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#D8DDD9] flex items-center justify-center mx-auto group-hover:bg-[#C8CEC9] group-hover:scale-[1.15] transition-all duration-300 ease-out">
                  <HelpCircle className="w-6 h-6 text-[#2D6A4F]" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2D6A4F] text-center">Otro</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">¿Tienes otra forma de colaborar?</p>
              </div>
            </div>
          </div>

          {/* Mobile: vertical layout */}
          <div className="md:hidden flex flex-col items-center gap-6">
            <div className="w-[120px] h-[120px] rounded-full bg-[#2D6A4F] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base tracking-wide">XANAEL</span>
            </div>
            <div className="w-[2px] h-8 bg-[#2D6A4F]" />
            <div className="grid grid-cols-1 gap-6 w-full max-w-xs">
              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.label} className="flex items-center gap-4 cursor-pointer" onClick={() => selectAndScroll(node.interest)}>
                    <div className="w-[64px] h-[64px] shrink-0 rounded-full bg-[#D8DDD9] flex items-center justify-center hover:bg-[#C8CEC9] hover:scale-[1.15] transition-all duration-300 ease-out">
                      <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A4A3A]">{node.label}</p>
                      <p className="text-xs text-gray-400">{node.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-[#1A4A3A] tracking-tight">Cómo funciona</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <span className="text-xl font-bold text-[#1A1A1A] leading-none shrink-0">
                {step.num}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formulario ── */}
      <section id="formulario" className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            backgroundImage: "url('/images/textura-hormigon.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#2A2A2A]/[0.95]" />
          <div className="relative p-8 md:p-12 lg:p-16">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Formulario de colaboración
            </h2>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 max-w-2xl"
            >
              {/* Interest checkboxes */}
              <p className="text-sm font-semibold text-white/80 mb-4">
                Estoy interesado en
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { val: "distribuidor", label: "Convertirme en distribuidor" },
                  { val: "instalador", label: "Convertirme en instalador certificado" },
                  { val: "ambos", label: "Distribuidor e instalador" },
                  { val: "otro", label: "Otro" },
                ].map((opt) => (
                  <label
                    key={opt.val}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-all duration-200 ${
                      interests.includes(opt.val)
                        ? "bg-white/15 border-white/50"
                        : "bg-white/[0.05] border-white/20 hover:border-white/35"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-[3px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                        interests.includes(opt.val)
                          ? "bg-white border-white"
                          : "border-white/40 bg-transparent"
                      }`}
                    >
                      {interests.includes(opt.val) && (
                        <svg className="w-2.5 h-2.5 text-[#1A4A3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-white/90">{opt.label}</span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={interests.includes(opt.val)}
                      onChange={() => toggleInterest(opt.val)}
                    />
                  </label>
                ))}
              </div>

              {/* Otro text field */}
              {interests.includes("otro") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <input
                    type="text"
                    placeholder="Describe cómo te gustaría colaborar"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className={inputClass}
                  />
                </motion.div>
              )}

              {/* Contact fields */}
              <p className="text-sm font-semibold text-white/80 mt-10 mb-4">
                Datos de contacto
              </p>

              <input type="text" placeholder="Nombre completo" className={`${inputClass} mb-4`} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email" className={inputClass} />
                <input type="tel" placeholder="Teléfono" className={inputClass} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <input type="text" placeholder="Empresa" className={inputClass} />
                <input type="text" placeholder="Provincia" className={inputClass} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <select className={selectClass} defaultValue="">
                    <option value="" disabled className="text-gray-900">Sector de actividad</option>
                    <option value="plagas" className="text-gray-900">Control de plagas</option>
                    <option value="construccion" className="text-gray-900">Construcción</option>
                    <option value="distribucion" className="text-gray-900">Distribución</option>
                    <option value="otro" className="text-gray-900">Otro</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="relative">
                  <select className={selectClass} defaultValue="">
                    <option value="" disabled className="text-gray-900">Años de experiencia</option>
                    <option value="0" className="text-gray-900">Menos de 1 año</option>
                    <option value="1-3" className="text-gray-900">1-3 años</option>
                    <option value="3-5" className="text-gray-900">3-5 años</option>
                    <option value="5+" className="text-gray-900">Más de 5 años</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <textarea
                placeholder="Cuéntanos cómo podemos colaborar"
                rows={4}
                className={`${inputClass} mt-4 resize-none`}
              />

              {/* RGPD */}
              <label className="flex items-start gap-3 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
                />
                <span className="text-xs text-white/60 leading-relaxed">
                  He leído y acepto la{" "}
                  <span className="underline">política de privacidad</span>. Tus datos serán tratados conforme al RGPD.
                </span>
              </label>

              <button
                type="submit"
                className="mt-8 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      <ManifestoSection />
      <Newsletter />
    </div>
  );
}
