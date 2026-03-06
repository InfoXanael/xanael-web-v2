"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  DoorOpen,
  Cuboid,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ManifestoSection from "@/components/home/ManifestoSection";
import Newsletter from "@/components/home/Newsletter";

/* ── data ── */
const features = [
  { icon: Layers, title: "Integración total", text: "Se instala como parte del viario, no como un añadido" },
  { icon: DoorOpen, title: "Cámara interior accesible", text: "Compatible con cualquier sistema de control de plagas" },
  { icon: Cuboid, title: "Hormigón prefabricado", text: "Material de construcción estándar, sin mantenimiento estructural" },
  { icon: ShieldCheck, title: "Patentado en España", text: "Primer sistema de este tipo integrado en superficie urbana" },
];

const problemas = [
  "La superficie urbana no tenía infraestructura preventiva propia",
  "El control de plagas tradicional actúa cuando el problema ya existe",
  "Sin estructura física, la prevención depende solo de intervenciones externas",
  "Los edificios e instalaciones quedan expuestos desde el perímetro",
  "La gestión integrada de plagas (GIP) no tenía capa de superficie",
];

const compactFeatures = [
  "Integración total en el viario urbano",
  "Cámara interior con bandeja técnica extraíble",
  "Tapa de fundición certificada EN124 clase B125",
  "Tornillos de seguridad con llave única propietaria",
  "Escudo central personalizable",
  "Agujeros de acceso con entrada diagonal anti-infiltración",
  "Compatible con cualquier sistema de control de plagas",
];

const compactGallery = [
  "/images/solutions/compact_model/bordillo_1.webp",
  "/images/solutions/compact_model/bordillo_2.webp",
  "/images/solutions/compact_model/bordillo_3.webp",
];

const tapaImages = [
  "/images/solutions/compact_model/tapa_1.webp",
  "/images/solutions/compact_model/tapa_2.webp",
];

const compactSpecs = [
  ["Peso", "24 kg"],
  ["Alto total", "25 cm"],
  ["Alto hasta línea de corte", "15 cm"],
  ["Largo", "50 cm"],
  ["Ancho base", "15 cm"],
  ["Ancho superior", "11,5 cm"],
  ["Cámara interior (alto × largo × ancho)", "21 × 31,5 × 8 cm"],
  ["Diámetro agujeros de acceso", "5 cm (entrada diagonal 6 cm)"],
  ["Separación entre agujeros", "18,5 cm"],
  ["Material cuerpo", "Hormigón prefabricado"],
  ["Tapa — largo × ancho × profundidad", "38 × 9 × 2 cm"],
  ["Tapa — material", "Fundición"],
  ["Tapa — normativa", "EN124 clase B125"],
  ["Tapa — escudo central", "Personalizable"],
  ["Tapa — fijación", "Tornillos de llave única propietaria"],
  ["Bandeja técnica — exterior (alto × largo × ancho)", "19 × 30,5 × 7,5 cm"],
  ["Bandeja técnica — profundidad", "18,5 cm"],
  ["Bandeja técnica — material", "Plástico impreso en 3D"],
  ["Bandeja técnica — acceso", "Extraíble por la parte superior"],
];

const ventajas = [
  "Único sistema de infraestructura preventiva en superficie urbana",
  "Compatible con cualquier empresa de control de plagas",
  "No sustituye — complementa los sistemas existentes",
  "Instalación única, sin intervenciones estructurales posteriores",
  "Alineado con la directiva europea GIP/IPM",
  "Registrable exclusivamente por técnicos autorizados",
];

const inputClass =
  "w-full bg-white/[0.08] border border-white/30 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

/* ── component ── */
export default function SolucionesPage() {
  const [selectedModel, setSelectedModel] = useState<"compact" | "standard">("compact");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [magnify, setMagnify] = useState({ active: false, x: 50, y: 50 });
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [tapaIdx, setTapaIdx] = useState(0);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!magnify.active) return;
    const handler = (e: MouseEvent) => {
      const gallery = document.getElementById("compact-gallery");
      if (gallery && !gallery.contains(e.target as Node)) {
        setMagnify({ active: false, x: 50, y: 50 });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [magnify.active]);

  const prevSlide = () => setGalleryIdx((i) => (i === 0 ? compactGallery.length - 1 : i - 1));
  const nextSlide = () => setGalleryIdx((i) => (i === compactGallery.length - 1 ? 0 : i + 1));
  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);

  return (
    <div className="pt-24">
      {/* ─── 1. HERO ─── */}
      <section className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">Soluciones</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
                Infraestructura urbana preventiva
              </h1>
              <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-lg">
                Hormigón prefabricado integrado en el viario urbano. Por fuera, bordillo. Por dentro, infraestructura sanitaria.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="text-sm font-semibold px-6 py-3 rounded-md bg-[#2D6A4F] text-white hover:bg-[#1A4A3A] transition-colors"
                >
                  Solicitar información
                </Link>
                <Link
                  href="/colaboradores"
                  className="text-sm font-semibold px-6 py-3 rounded-md border border-gray-300 text-[#1A1A1A] hover:bg-gray-100 transition-colors"
                >
                  Colaborar
                </Link>
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] scale-[1.3] origin-center">
              <Image
                src="/images/solutions/bordillo_1.webp"
                alt="Bordillo técnico Xanael"
                fill
                className="object-contain"
                style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.15))" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FRANJA NEGRA ─── */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title}>
                  <Icon className="w-7 h-7 text-white/80 mb-4" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold">{f.title}</h3>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. PROBLEMAS QUE RESOLVEMOS ─── */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-16 py-24">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A4A3A] tracking-tight">
                Problemas que resolvemos
              </h2>
              <ul className="mt-10 space-y-5">
                {problemas.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-gray-600 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/solutions/basuras.webp"
              alt="Problema de plagas urbanas"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── 4A. SELECTOR DE MODELOS ─── */}
      <section className="bg-[#E8EEE9]">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-0">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A4A3A] tracking-tight">
              Tipos de infraestructura disponibles
            </h2>
            <Link
              href="/contacto"
              className="mt-5 inline-block text-sm font-semibold px-6 py-3 rounded-md border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-colors"
            >
              ¿Necesitas ayuda?
            </Link>
          </div>

          {/* Compact selector cards */}
          <div className="mt-10 flex justify-center gap-6">
            {/* Compact */}
            <button
              onClick={() => setSelectedModel("compact")}
              className={`w-[240px] rounded-t-lg rounded-b-none overflow-hidden transition-all duration-200 ${
                selectedModel === "compact"
                  ? "bg-white shadow-md ring-2 ring-[#2D6A4F]"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            >
              <div className="relative w-full h-[190px]">
                <Image
                  src="/images/solutions/bordillo_1.webp"
                  alt="Modelo Compact"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="py-3 px-2 text-center">
                <span className="text-sm font-semibold text-[#1A1A1A]">Modelo Compact</span>
              </div>
            </button>

            {/* Standard — disabled */}
            <div className="w-[200px] rounded-t-lg rounded-b-none overflow-hidden bg-white/30 cursor-not-allowed opacity-50">
              <div className="w-full h-[160px] bg-[#ECECEC] flex items-center justify-center">
                <span className="text-xs text-gray-400">Imagen próximamente</span>
              </div>
              <div className="py-3 px-2 text-center">
                <span className="text-sm font-semibold text-[#1A1A1A]">Modelo Standard</span>
                <span className="ml-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-500 align-middle">
                  Próximamente
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4B. DETALLE DEL MODELO ─── */}
      <AnimatePresence mode="wait">
        {selectedModel === "compact" && (
          <motion.section
            key="compact-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[#F5F5F5]"
          >
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left: info */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                    Modelo Compact
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Bordillo técnico de hormigón prefabricado para instalación en aceras, perímetros de edificios y viario urbano. Cámara interior accesible con bandeja técnica extraíble.
                  </p>
                  <ul className="mt-8 space-y-3">
                    {compactFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-gray-600 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Link
                      href="/contacto"
                      className="text-sm font-semibold px-6 py-3 rounded-md bg-[#2D6A4F] text-white hover:bg-[#1A4A3A] transition-colors"
                    >
                      Solicitar información
                    </Link>
                  </div>
                </div>

                {/* Right: carousel with magnifier */}
                <div className="relative">
                  <div
                    id="compact-gallery"
                    className={`relative w-full aspect-square bg-white rounded-lg overflow-hidden ${
                      isDesktop ? (magnify.active ? "cursor-zoom-out" : "cursor-zoom-in") : ""
                    }`}
                    onClick={(e) => {
                      if (!isDesktop) return;
                      if (magnify.active) {
                        setMagnify({ active: false, x: 50, y: 50 });
                      } else {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMagnify({
                          active: true,
                          x: ((e.clientX - rect.left) / rect.width) * 100,
                          y: ((e.clientY - rect.top) / rect.height) * 100,
                        });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (!isDesktop || !magnify.active) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMagnify({
                        active: true,
                        x: ((e.clientX - rect.left) / rect.width) * 100,
                        y: ((e.clientY - rect.top) / rect.height) * 100,
                      });
                    }}
                  >
                    <Image
                      src={compactGallery[galleryIdx]}
                      alt={`Modelo Compact - imagen ${galleryIdx + 1}`}
                      fill
                      className="object-contain p-6 transition-transform duration-300"
                      style={{
                        transformOrigin: `${magnify.x}% ${magnify.y}%`,
                        transform: magnify.active ? "scale(2)" : "scale(1)",
                      }}
                    />
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
                  </button>

                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {compactGallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIdx(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          galleryIdx === i ? "bg-[#2D6A4F]" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Accordions */}
              <div className="mt-8 space-y-3 lg:w-1/2">
                {/* Especificaciones */}
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <button
                    onClick={() => toggleAccordion("specs")}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#1A4A3A] hover:bg-gray-50 transition-colors"
                  >
                    Especificaciones
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        openAccordion === "specs" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "specs" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 pr-4 font-semibold text-[#1A1A1A]">Especificación</th>
                                <th className="text-left py-3 font-semibold text-[#1A1A1A]">Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {compactSpecs.map(([spec, val], i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                                  <td className="py-2.5 pr-4 text-gray-600">{spec}</td>
                                  <td className="py-2.5 text-[#1A1A1A] font-medium">{val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Instalación */}
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <button
                    onClick={() => toggleAccordion("install")}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#1A4A3A] hover:bg-gray-50 transition-colors"
                  >
                    Instalación
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        openAccordion === "install" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "install" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                          No requiere obras adicionales una vez instalado. La cámara interior es accesible en todo momento por la tapa superior sin necesidad de herramientas especiales.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tapa personalizable */}
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <button
                    onClick={() => toggleAccordion("tapa")}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#1A4A3A] hover:bg-gray-50 transition-colors"
                  >
                    Tapa de fundición personalizable
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        openAccordion === "tapa" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "tapa" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            Cada bordillo XANAEL incorpora una tapa de fundición certificada EN124 clase B125. El escudo central es personalizable con el emblema del municipio o entidad.
                          </p>
                          <div className="relative">
                            <div className="relative w-full aspect-[21/9] bg-[#F5F5F5] rounded-md overflow-hidden">
                              <Image
                                src={tapaImages[tapaIdx]}
                                alt={`Tapa personalizable - vista ${tapaIdx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setTapaIdx((i) => (i === 0 ? tapaImages.length - 1 : i - 1)); }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4 text-[#1A1A1A]" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setTapaIdx((i) => (i === tapaImages.length - 1 ? 0 : i + 1)); }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                            >
                              <ChevronRight className="w-4 h-4 text-[#1A1A1A]" />
                            </button>
                            <div className="flex justify-center gap-2 mt-3">
                              {tapaImages.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => { e.stopPropagation(); setTapaIdx(i); }}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    tapaIdx === i ? "bg-[#2D6A4F]" : "bg-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 6. VENTAJA COMPETITIVA ─── */}
      <section className="bg-[#1A4A3A]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-16 py-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ventaja competitiva
              </h2>
              <ul className="mt-8 space-y-4">
                {ventajas.map((v, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/70 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-white/80 leading-relaxed">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-0">
            <Image
              src="/images/solutions/ventaja_bordillo.webp"
              alt="Ventaja competitiva del bordillo Xanael"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── 7. FORMULARIO ─── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
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
              Solicita información sobre XANAEL
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Completa el formulario y nuestro equipo se pondrá en contacto contigo.
            </p>

            <form className="mt-10 max-w-2xl space-y-4">
              <input type="text" placeholder="Nombre completo" className={inputClass} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email" className={inputClass} />
                <input type="tel" placeholder="Teléfono" className={inputClass} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Empresa" className={inputClass} />
                <input type="text" placeholder="Provincia" className={inputClass} />
              </div>

              <textarea
                placeholder="Mensaje"
                rows={4}
                className={`${inputClass} resize-none`}
              />

              <label className="flex items-start gap-3 cursor-pointer">
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
                className="mt-4 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── 8. MANIFESTO + NEWSLETTER ─── */}
      <ManifestoSection />
      <Newsletter />
    </div>
  );
}
