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
  { icon: Layers, title: "Integración total", text: "Se integra directamente en el viario urbano, no como un elemento añadido" },
  { icon: DoorOpen, title: "Cámara interior accesible", text: "Compatible con distintos sistemas de detección, monitorización y control de plagas" },
  { icon: Cuboid, title: "Hormigón prefabricado", text: "Elemento constructivo estándar, sin mantenimiento estructural" },
  { icon: ShieldCheck, title: "Patentado en España", text: "Primer sistema de infraestructura preventiva de plagas integrado en superficie urbana" },
];

const problemas = [
  "La superficie urbana no disponía de infraestructura preventiva propia",
  "El control de plagas tradicional actúa cuando el problema ya ha aparecido",
  "Sin infraestructura física, la prevención depende de intervenciones externas",
  "Los edificios e instalaciones quedan expuestos desde el perímetro urbano",
  "La gestión integrada de plagas (GIP) carecía de una capa de control en superficie",
];

const compactFeatures = [
  "Integración total en el viario urbano",
  "Cámara interior con bandeja técnica extraíble",
  "Tapa de fundición certificada EN124 clase B125",
  "Tornillos de seguridad con llave única propietaria",
  "Escudo central personalizable",
  "Agujeros de acceso con entrada diagonal anti-infiltración",
  "Compatible con sistemas de detección, monitorización y control de plagas",
];

const standardFeatures = [
  "Integración total en el viario urbano",
  "Acceso interior circular para colocación de cebo para termitas",
  "Dos ranuras laterales para varilla con cebo",
  "Sin bandeja técnica — cámara diáfana de acceso directo",
  "Tapa de fundición certificada EN124 clase B125",
  "Tornillos de seguridad con llave única propietaria",
  "Escudo central personalizable",
  "Compatible con distintos sistemas de detección, monitorización y control de plagas",
];

const compactGallery = [
  "/images/infrastructure/compact_model/bordillo_1.webp",
  "/images/infrastructure/compact_model/bordillo_2.webp",
  "/images/infrastructure/compact_model/bordillo_3.webp",
];

const standardGallery = [
  "/images/infrastructure/standard_model/bordillo_1.webp",
  "/images/infrastructure/standard_model/bordillo_2.webp",
  "/images/infrastructure/standard_model/bordillo_3.webp",
  "/images/infrastructure/standard_model/bordillo_4.webp",
];

const compactTapaImages = [
  "/images/infrastructure/compact_model/tapa_1.webp",
];

const standardTapaImages: string[] = [];

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

const standardSpecs = [
  ["Peso", "42 kg"],
  ["Material cuerpo", "Hormigón prefabricado"],
  ["Acceso interior", "Circular, para cebo de termitas"],
  ["Ranuras laterales", "2, para varilla con cebo"],
  ["Tapa — material", "Fundición"],
  ["Tapa — normativa", "EN124 clase B125"],
  ["Tapa — escudo central", "Personalizable"],
  ["Tapa — fijación", "Tornillos de llave única propietaria"],
];

const ventajas = [
  "Primer sistema de infraestructura preventiva de plagas integrado en la superficie urbana",
  "Compatible con cualquier empresa de control de plagas",
  "No sustituye los sistemas existentes: los complementa",
  "Instalación única, sin intervenciones estructurales posteriores",
  "Alineado con la gestión integrada de plagas (GIP / IPM) de la normativa europea",
  "Acceso registrable exclusivamente por técnicos autorizados",
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

  const [formSending, setFormSending] = useState(false);
  const [formSent, setFormSent] = useState(false);
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

  const currentGallery = selectedModel === "compact" ? compactGallery : standardGallery;
  const currentFeatures = selectedModel === "compact" ? compactFeatures : standardFeatures;
  const currentSpecs = selectedModel === "compact" ? compactSpecs : standardSpecs;
  const currentTapa = selectedModel === "compact" ? compactTapaImages : standardTapaImages;

  const switchModel = (model: "compact" | "standard") => {
    setSelectedModel(model);
    setGalleryIdx(0);
    setTapaIdx(0);
    setOpenAccordion(null);
    setMagnify({ active: false, x: 50, y: 50 });
  };

  const prevSlide = () => setGalleryIdx((i) => (i === 0 ? currentGallery.length - 1 : i - 1));
  const nextSlide = () => setGalleryIdx((i) => (i === currentGallery.length - 1 ? 0 : i + 1));
  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);

  return (
    <div className="pt-24">
      {/* ─── 1. HERO ─── */}
      <section className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">Infraestructuras</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
                Infraestructura urbana sanitaria preventiva
              </h1>
              <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-lg">
                Por fuera, bordillo urbano. Por dentro, infraestructura sanitaria preparada para la detección y control de plagas.
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
            <div className="relative w-full aspect-[4/3] lg:scale-[1.3] origin-center overflow-hidden">
              <Image
                src="/images/infrastructure/bordillo_1.webp"
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
          <div className="flex items-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-24 py-24">
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
              src="/images/infrastructure/basuras.webp"
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

          {/* Model selector cards */}
          <div className="mt-10 grid grid-cols-2 sm:flex sm:justify-center gap-4 sm:gap-6">
            {/* Compact */}
            <button
              onClick={() => switchModel("compact")}
              className={`w-full sm:w-[240px] rounded-t-lg rounded-b-none overflow-hidden transition-all duration-200 ${
                selectedModel === "compact"
                  ? "bg-white shadow-md ring-2 ring-[#2D6A4F]"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            >
              <div className="relative w-full h-[190px]">
                <Image
                  src="/images/infrastructure/bordillo_1.webp"
                  alt="Modelo Compact"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="py-3 px-2 text-center">
                <span className="text-sm font-semibold text-[#1A1A1A]">Modelo Compact</span>
              </div>
            </button>

            {/* Standard */}
            <button
              onClick={() => switchModel("standard")}
              className={`w-full sm:w-[240px] rounded-t-lg rounded-b-none overflow-hidden transition-all duration-200 ${
                selectedModel === "standard"
                  ? "bg-white shadow-md ring-2 ring-[#2D6A4F]"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            >
              <div className="relative w-full h-[190px]">
                <Image
                  src="/images/infrastructure/standard_model/bordillo_1.webp"
                  alt="Modelo Standard"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="py-3 px-2 text-center">
                <span className="text-sm font-semibold text-[#1A1A1A]">Modelo Standard</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ─── 4B. DETALLE DEL MODELO ─── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedModel}
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
                  {selectedModel === "compact" ? "Modelo Compact" : "Modelo Standard"}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {selectedModel === "compact"
                    ? "Bordillo técnico de hormigón prefabricado diseñado para integrarse en aceras, perímetros de edificios y viario urbano. Incorpora una cámara interior accesible con bandeja técnica extraíble, preparada para integrar sistemas de detección temprana, monitorización y control de plagas."
                    : "Bordillo técnico de hormigón prefabricado de mayores dimensiones, diseñado para instalación en perímetros de mayor envergadura y zonas de alta demanda."}
                </p>
                <ul className="mt-8 space-y-3">
                  {currentFeatures.map((f, i) => (
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
                    src={currentGallery[galleryIdx]}
                    alt={`${selectedModel === "compact" ? "Modelo Compact" : "Modelo Standard"} - imagen ${galleryIdx + 1}`}
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
                  {currentGallery.map((_, i) => (
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
                            {currentSpecs.map(([spec, val], i) => (
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
                      <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed space-y-2">
                        <p>Se instala como un elemento más del bordillo urbano.</p>
                        <p>Una vez colocado, no requiere obras adicionales.</p>
                        <p>La cámara interior es accesible desde la tapa superior para tareas de revisión, monitorización o control.</p>
                        <p>Se instala durante la ejecución del viario o sustituyendo bordillos existentes.</p>
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
                        <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                          <p>Cada bordillo XANAEL incorpora una tapa de fundición certificada EN124 clase B125.</p>
                          <p>El escudo central puede personalizarse con el emblema del municipio o entidad, reforzando su integración en el espacio público.</p>
                          <p>Esto permite que XANAEL forme parte visible del mobiliario urbano del municipio.</p>
                        </div>
                        {currentTapa.length > 0 && (
                          <div className="relative mt-4">
                            <div className="relative w-full aspect-[21/9] bg-[#F5F5F5] rounded-md overflow-hidden">
                              <Image
                                src={currentTapa[tapaIdx]}
                                alt={`Tapa personalizable - vista ${tapaIdx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ─── 6. VENTAJA COMPETITIVA ─── */}
      <section className="bg-[#1A4A3A]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-16 py-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ventajas del sistema XANAEL
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
              src="/images/infrastructure/ventaja_bordillo.webp"
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
              Solicita información para implantar XANAEL
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Completa el formulario y nuestro equipo te informará sobre implantación, distribución o colaboración con XANAEL.
            </p>

            <form
              className="mt-10 max-w-2xl space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (formSending) return;
                setFormSending(true);
                const fd = new FormData(e.currentTarget);
                try {
                  await fetch("/api/formularios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      tipo: "comercial",
                      nombre: fd.get("nombre"),
                      email: fd.get("email"),
                      telefono: fd.get("telefono"),
                      empresa: fd.get("empresa"),
                      sector: fd.get("interes"),
                      mensaje: fd.get("mensaje"),
                    }),
                  });
                  setFormSent(true);
                } catch {
                  alert("Error al enviar el formulario. Inténtalo de nuevo.");
                } finally {
                  setFormSending(false);
                }
              }}
            >
              <input type="text" name="nombre" placeholder="Nombre completo" required className={inputClass} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="Email" required className={inputClass} />
                <input type="tel" name="telefono" placeholder="Teléfono" className={inputClass} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="empresa" placeholder="Empresa" className={inputClass} />
                <input type="text" name="provincia" placeholder="Provincia" className={inputClass} />
              </div>

              <select
                name="interes"
                required
                defaultValue=""
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled className="text-white/50">¿En qué estás interesado?</option>
                <option value="implantacion_municipio">Implantación en municipio</option>
                <option value="instalacion_empresa">Instalación en empresa / industria</option>
                <option value="distribucion">Distribución</option>
                <option value="colaboracion_tecnica">Colaboración técnica</option>
                <option value="informacion_general">Información general</option>
              </select>

              <textarea
                name="mensaje"
                placeholder="Mensaje"
                required
                rows={4}
                className={`${inputClass} resize-none`}
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="rgpd"
                  required
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
                />
                <span className="text-xs text-white/60 leading-relaxed">
                  He leído y acepto la{" "}
                  <span className="underline">política de privacidad</span>. Tus datos serán tratados conforme al RGPD.
                </span>
              </label>

              {formSent ? (
                <p className="text-white font-medium">Formulario enviado correctamente. Nos pondremos en contacto contigo.</p>
              ) : (
                <button
                  type="submit"
                  disabled={formSending}
                  className="mt-4 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {formSending ? "Enviando..." : "Enviar solicitud"}
                </button>
              )}
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
