import Link from "next/link";
import Image from "next/image";
import { Shield, Leaf, Eye, Target } from "lucide-react";
import NewsSection from "@/components/home/NewsSection";

const pillars = [
  {
    icon: Shield,
    title: "Seguridad",
    text: "Diseñado para proteger a personas, niños y animales de compañía, eliminando los riesgos de los sistemas tradicionales de cebo expuesto.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad",
    text: "Previene pérdidas de producto y evita la contaminación de aguas y suelos, contribuyendo a un modelo urbano más responsable.",
  },
  {
    icon: Eye,
    title: "Discreción",
    text: "Integrado estéticamente en el mobiliario urbano, pasa desapercibido para el ciudadano sin alterar el espacio público.",
  },
  {
    icon: Target,
    title: "Eficacia",
    text: "Sistema de vigilancia y control continuo en superficie, actuando de forma preventiva antes de que el problema llegue al interior de los edificios.",
  },
];

export default function AyuntaliaPage() {
  return (
    <main className="pt-24">
      {/* Breadcrumb */}
      <div className="max-w-[900px] mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/noticias" className="hover:text-[#2D6A4F] transition-colors">
            Noticias
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">Ayuntalia 2025</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-[900px] mx-auto px-6 pb-10">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Eventos
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A4A3A] leading-tight">
          XANAEL en Ayuntalia 2025: primera presentación institucional del
          bordillo inteligente
        </h1>
        <time className="mt-4 block text-sm text-gray-400">
          20 de septiembre de 2025
        </time>
        <div className="mt-6 h-[1px] bg-gray-200" />
      </header>

      {/* Article body */}
      <article className="max-w-[900px] mx-auto px-6">
        {/* Intro */}
        <p className="text-gray-600 leading-relaxed">
          En septiembre de 2025, XANAEL dio su primer gran paso en el ámbito
          institucional. La feria Ayuntalia, celebrada del 18 al 20 de
          septiembre en Ribaforada, Navarra, fue el escenario elegido para la
          presentación oficial del primer bordillo inteligente patentado en
          España para el control sostenible de plagas urbanas.
        </p>

        {/* Block 1: ministra — image right */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-[60%]">
            <p className="text-gray-600 leading-relaxed">
              La jornada alcanzó su momento más destacado con la visita de Elma
              Saiz, Ministra de Inclusión, Seguridad Social y Migraciones, y de
              Tirso Calvo, alcalde de Ribaforada. Ambos conocieron de primera
              mano la solución desarrollada por Carlos, Iñaki y José Javier
              Rubio Carrera, inventores de la patente. La ministra mostró
              interés por el enfoque preventivo y su potencial aplicación en
              entornos municipales.
            </p>
          </div>
          <div className="md:w-[40%] relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-1/ayuntalia-2025-2.webp"
              alt="Visita de la ministra Elma Saiz al stand de XANAEL"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bridge paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          La presencia en Ayuntalia supuso un punto de inflexión: el primer
          contacto directo con la administración pública y los responsables de
          la gestión urbana, que pudieron comprobar in situ las características
          del sistema patentado.
        </p>

        {/* Block 2: stand — image left */}
        <div className="mt-12 flex flex-col md:flex-row-reverse gap-8 items-start">
          <div className="md:w-[50%]">
            <p className="text-gray-600 leading-relaxed">
              Desde el primer momento, el stand de XANAEL —presentado bajo el
              paraguas de Grupo Rubio— captó la atención de alcaldes, técnicos
              municipales y responsables de servicios urbanos. La propuesta fue
              clara: una infraestructura sanitaria preventiva integrada en el
              propio bordillo urbano, sin productos químicos, sin intervenciones
              continuas, sin riesgo para personas ni animales.
            </p>
          </div>
          <div className="md:w-[50%] relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-1/ayuntalia-2025-1.webp"
              alt="Stand de XANAEL en Ayuntalia 2025"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1A4A3A]">
            Los cuatro pilares de XANAEL
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex gap-4 items-start bg-[#F0F4F2] rounded-md p-5"
                >
                  <Icon
                    className="w-6 h-6 text-[#2D6A4F] shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-semibold text-[#1A4A3A]">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full-width image */}
        <figure className="mt-16">
          <div className="relative w-full aspect-[21/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-1/ayuntalia-2025-3.webp"
              alt="El equipo de XANAEL atendiendo visitantes en Ayuntalia 2025"
              fill
              className="object-cover object-bottom"
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            El equipo de XANAEL atendiendo visitantes en Ayuntalia 2025
          </figcaption>
        </figure>

        {/* Closing paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed pb-16">
          Ayuntalia 2025 marcó el inicio de una nueva etapa para XANAEL. Un
          primer contacto con la administración pública que confirma el interés
          institucional por soluciones preventivas, permanentes y certificables
          para la gestión urbana de plagas. Navarra, una vez más, referente en
          innovación aplicada.
        </p>
      </article>

      <div className="h-[1px] bg-gray-200 max-w-[900px] mx-auto" />

      {/* CTA */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            ¿Interesado en nuestra solución?
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Contacta con nuestro equipo y descubre cómo XANAEL puede proteger
            tu municipio o instalación.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-block text-sm font-semibold bg-white text-[#1A1A1A] px-7 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            Solicita información
          </Link>
        </div>
      </section>

      {/* Related news */}
      <NewsSection excludeSlug="ayuntalia-2025" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
