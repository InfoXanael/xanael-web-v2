"use client";

import Link from "next/link";
import Image from "next/image";
import ManifestoSection from "@/components/home/ManifestoSection";
import Newsletter from "@/components/home/Newsletter";

export default function NosotrosPage() {
  return (
    <div className="pt-24 bg-[#F5F5F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Nosotros</span>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight max-w-4xl">
          Una idea que lleva años tomando forma.
        </h1>
        <p className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl">
          XANAEL nació de décadas de experiencia en el sector del control de
          plagas y de una pregunta sencilla: ¿por qué no proteger la ciudad
          desde su propia infraestructura?
        </p>
      </header>

      {/* Bloque texto grande */}
      <section className="bg-white py-24">
        <div className="max-w-[800px] mx-auto px-6">
        <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug tracking-tight text-center">
          Nuestro objetivo desde el principio ha sido claro: integrar la
          prevención de plagas directamente en la superficie urbana, antes de
          que el problema llegue al interior de los edificios.
        </p>
        </div>
      </section>

      {/* Bloque origen */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-widest">
                Origen
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#1A1A1A] tracking-tight">
                De la experiencia al producto
              </h2>
              <p className="mt-6 text-gray-500 leading-relaxed">
                Carlos, Iñaki y José Javier Rubio Carrera llevan décadas en el
                sector del control de plagas, al frente de Grupo Rubio, una
                empresa familiar con más de veinte años de trayectoria en
                higiene urbana y sanidad ambiental.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Fue precisamente esa experiencia acumulada la que les llevó a
                identificar un problema sin solución estructural: los roedores
                acceden a los edificios desde la superficie, y ninguna solución
                existente abordaba ese punto de entrada de forma permanente.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                XANAEL nació de ahí. Tres años de desarrollo, patente
                registrada en España, y un producto que ya se ha presentado en
                ferias como Ayuntalia 2025, Municipalia 2025 y EXPOCIDA 2026.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full bg-[#E0E0E0] rounded-md overflow-hidden">
              <Image
                src="/images/AboutUs/expocida-fundadores.webp"
                alt="Carlos, Iñaki y José Javier Rubio Carrera, fundadores de XANAEL"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bloque innovación */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/AboutUs/bordillo-prototipo.webp"
                alt="Prototipo del bordillo XANAEL en stand"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Innovación
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white tracking-tight">
                El primer bordillo técnico antirroedores patentado en España
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                XANAEL es un bordillo de hormigón prefabricado que integra en
                su interior una cámara técnica para el control de plagas.
                Instalado en el perímetro de edificios, parques, instalaciones
                industriales o espacios públicos, actúa como barrera física
                permanente interceptando las rutas habituales de los roedores
                antes de que accedan al interior.
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                Sin productos químicos expuestos, sin intervenciones continuas,
                sin riesgo para personas ni animales. Una solución que forma
                parte de la ciudad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque equipo */}
      <section className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative w-full h-[500px] bg-[#E0E0E0] rounded-md overflow-hidden">
            <Image
              src="/images/AboutUs/expocida-equipo.webp"
              alt="El equipo de XANAEL en EXPOCIDA 2026"
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <div className="mt-12 max-w-2xl">
            <span className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-widest">
              Equipo
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#1A1A1A] tracking-tight">
              El equipo detrás de XANAEL
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">
              EXPOCIDA 2026 fue el primer gran escaparate internacional de
              XANAEL. Durante dos días en IFEMA Madrid, el equipo presentó el
              sistema a empresas de control de plagas, técnicos municipales y
              responsables del sector de toda España y Europa. Una validación
              en campo que confirmó lo que ya sabíamos: el mercado estaba
              esperando esta solución.
            </p>
          </div>
        </div>
      </section>

      <ManifestoSection />
      <Newsletter />
    </div>
  );
}
