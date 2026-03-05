import Link from "next/link";
import Image from "next/image";
import NewsSection from "@/components/home/NewsSection";

export default function ExpocidaPosterPage() {
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
          <span className="text-[#1A4A3A]">EXPOCIDA 2026 — Póster técnico</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-[900px] mx-auto px-6 pb-10">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Innovación
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A4A3A] leading-tight">
          XANAEL presenta su póster técnico en EXPOCIDA 2026
        </h1>
        <time className="mt-4 block text-sm text-gray-400">
          31 de enero de 2026
        </time>
        <div className="mt-6 h-[1px] bg-gray-200" />
      </header>

      {/* Article body */}
      <article className="max-w-[900px] mx-auto px-6">
        {/* Two-column: poster left, text right */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-[45%] relative aspect-[3/4] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-3/poster.webp"
              alt="Póster técnico de XANAEL presentado en EXPOCIDA 2026"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-[55%]">
            <p className="text-gray-600 leading-relaxed">
              XANAEL participó en la convocatoria oficial de pósters técnicos y
              científicos de EXPOCIDA 2026, el evento de referencia del sector
              del control de plagas en España, celebrado en IFEMA Madrid los
              días 30 y 31 de enero de 2026.
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              El póster, expuesto como Póster Nº 8 en el Pabellón 5, presentó
              de forma detallada el sistema de infraestructura urbana sanitaria
              preventiva desarrollado por XANAEL: un bordillo de hormigón
              prefabricado que integra una cámara técnica interior diseñada para
              albergar sistemas de control de plagas.
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              La propuesta técnica recoge los fundamentos del sistema patentado:
              la interceptación de rutas de roedores en superficie, la
              eliminación de productos químicos expuestos y la integración
              permanente en el mobiliario urbano sin alterar la estética del
              espacio público.
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              La presencia en EXPOCIDA supone un paso importante en la
              validación técnica del proyecto ante profesionales del sector,
              empresas de control de plagas, técnicos municipales y responsables
              de higiene ambiental de toda España y Europa.
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              XANAEL continúa consolidando su posición como la primera solución
              de infraestructura urbana sanitaria preventiva patentada en
              España, con un enfoque que combina innovación, sostenibilidad y
              eficacia demostrada.
            </p>
          </div>
        </div>

        {/* Full-width image: portada */}
        <figure className="mt-16">
          <Image
            src="/images/news/new-3/portada.webp"
            alt="Stand de XANAEL en EXPOCIDA 2026"
            width={1200}
            height={800}
            className="max-w-[30%] h-auto rounded-md mx-auto"
          />
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            EXPOCIDA 2026 — Póster Nº 8, Pabellón 5, IFEMA Madrid
          </figcaption>
        </figure>

        {/* Closing paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed pb-16">
          La participación en EXPOCIDA 2026 refuerza el compromiso de XANAEL
          con la divulgación técnica y la colaboración con el sector
          profesional del control de plagas, abriendo nuevas vías de diálogo
          con empresas e instituciones interesadas en soluciones preventivas y
          permanentes.
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
      <NewsSection excludeSlug="expocida-2026-poster" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
