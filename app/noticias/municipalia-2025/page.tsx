import Link from "next/link";
import Image from "next/image";
import NewsSection from "@/components/home/NewsSection";

export default function MunicipaliaPage() {
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
          <span className="text-[#1A4A3A]">Municipalia 2025</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-[900px] mx-auto px-6 pb-10">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Eventos
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A4A3A] leading-tight">
          XANAEL en Municipalia: Gran acogida del sistema de prevención de
          plagas urbanas
        </h1>
        <time className="mt-4 block text-sm text-gray-400">
          23 de octubre de 2025
        </time>
        <div className="mt-6 h-[1px] bg-gray-200" />
      </header>

      {/* Article body */}
      <article className="max-w-[900px] mx-auto px-6">
        {/* Intro */}
        <p className="text-gray-600 leading-relaxed">
          XANAEL cerró su participación en Municipalia con un balance muy
          positivo. Durante los días 21, 22 y 23 de octubre, el stand 6036 se
          convirtió en uno de los puntos de mayor actividad de la feria,
          recibiendo la visita de técnicos de medio ambiente, responsables
          municipales, alcaldes, concejales y empresas del sector.
        </p>

        {/* Full-width image: stand */}
        <figure className="mt-12">
          <div className="relative w-full aspect-[21/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-2/municipalia-2.webp"
              alt="Stand de XANAEL lleno de visitantes en Municipalia 2025"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </figure>

        {/* Central paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          La acogida superó ampliamente las expectativas. Los asistentes
          mostraron especial interés por el enfoque preventivo de XANAEL:
          abordar la gestión de plagas urbanas desde la superficie, antes de que
          el problema llegue al interior de los edificios. El concepto de
          infraestructura urbana sanitaria preventiva resonó con fuerza entre
          los responsables de servicios municipales.
        </p>

        {/* Block: team image right */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-[55%]">
            <p className="text-gray-600 leading-relaxed">
              El equipo regresó con numerosos contactos y la confirmación de que
              XANAEL tiene un espacio real en las ciudades del futuro. &ldquo;Hemos
              comprobado que la prevención de plagas urbanas desde la superficie
              es una prioridad compartida por muchos municipios&rdquo;, destacaron
              desde XANAEL tras el evento.
            </p>
          </div>
          <div className="md:w-[45%] relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-2/municipalia.webp"
              alt="Equipo de XANAEL en Municipalia 2025"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Closing paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed pb-16">
          Municipalia se consolida como un punto de inflexión importante para el
          proyecto, abriendo nuevas oportunidades de colaboración con el sector
          público y demostrando el interés creciente por soluciones
          estructurales y permanentes en la gestión de plagas urbanas.
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
      <NewsSection excludeSlug="municipalia-2025" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
