import Link from "next/link";
import Image from "next/image";
import NewsSection from "@/components/home/NewsSection";

export default function Expocida2026Page() {
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
          <span className="text-[#1A4A3A]">EXPOCIDA 2026</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-[900px] mx-auto px-6 pb-10">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Eventos
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A4A3A] leading-tight">
          XANAEL en EXPOCIDA 2026: dos días que marcan un antes y un después
        </h1>
        <time className="mt-4 block text-sm text-gray-400">
          28 de febrero de 2026
        </time>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Dos días de conversaciones reales, preguntas técnicas y debates sobre
          el futuro de la sanidad ambiental. El sector coincide: la gestión de
          plagas ya no puede ser solo reactiva.
        </p>
        <div className="mt-6 h-[1px] bg-gray-200" />
      </header>

      {/* Article body */}
      <article className="max-w-[900px] mx-auto px-6">
        {/* Portada full-width */}
        <figure>
          <div className="relative w-full aspect-[21/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-4/portada.webp"
              alt="El equipo XANAEL al completo en EXPOCIDA 2026"
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            El equipo XANAEL al completo en EXPOCIDA 2026 — Pabellón 5, Stand
            44, IFEMA Madrid
          </figcaption>
        </figure>

        {/* Texto 1 */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          Hay ferias a las que vas a mostrar tu producto. Y otras en las que
          entiendes que el sector está dando un paso adelante. EXPOCIDA 2026 ha
          sido eso para XANAEL.
        </p>

        {/* stand-gente + texto 2 — dos columnas */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <figure className="md:w-[50%]">
            <Image
              src="/images/news/new-4/stand-gente.webp"
              alt="Visitantes del sector descubriendo XANAEL en EXPOCIDA 2026"
              width={900}
              height={600}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="mt-3 text-sm text-gray-400 text-center">
              Visitantes del sector descubriendo XANAEL en EXPOCIDA 2026
            </figcaption>
          </figure>
          <div className="md:w-[50%]">
            <p className="text-gray-600 leading-relaxed">
              Dos días de conversaciones reales. Preguntas técnicas. Debates sobre
              hacia dónde evoluciona la sanidad ambiental. Cada vez más
              profesionales coinciden en algo: la gestión de plagas ya no puede ser
              solo reactiva. La ciudad también puede prevenir.
            </p>
          </div>
        </div>

        {/* texto 3 + stand-general — dos columnas */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-[45%]">
            <p className="text-gray-600 leading-relaxed">
              Porque la sanidad ambiental no es únicamente un servicio. Es
              infraestructura. Es prevención. Es salud pública. XANAEL lo integra
              en el propio viario urbano — un bordillo de hormigón prefabricado con
              cámara interior lista para albergar cualquier sistema de control de
              plagas.
            </p>
          </div>
          <figure className="md:w-[55%]">
            <div className="relative w-full min-h-[500px] bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/news/new-4/stand-general.webp"
                alt="Stand 44 de XANAEL en EXPOCIDA 2026"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center">
              Stand 44 — XANAEL, Pabellón 5, IFEMA Madrid
            </figcaption>
          </figure>
        </div>

        {/* Grid 2 columnas: bordillos */}
        <figure className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative w-full aspect-[4/3] bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/news/new-4/bordillo-1.webp"
                alt="Prototipo XANAEL expuesto en EXPOCIDA 2026"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-[4/3] bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/news/new-4/bordillo-2.webp"
                alt="Prototipo XANAEL expuesto en EXPOCIDA 2026"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            Prototipo XANAEL expuesto en EXPOCIDA 2026
          </figcaption>
        </figure>

        {/* Texto 4 */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          Al frente del proyecto, Carlos Rubio Carrera, fundador de XANAEL y
          referente en sanidad ambiental con más de 20 años de trayectoria en
          el sector. Su visión es clara: la prevención estructural es el
          siguiente paso natural en la gestión integrada de plagas.
        </p>

        {/* Carlos — contenida y centrada */}
        <figure className="mt-12 flex flex-col items-center">
          <div className="relative w-full max-w-[600px] aspect-[4/3] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-4/carlos.webp"
              alt="Carlos Rubio Carrera — Fundador y CEO de XANAEL"
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            Carlos Rubio Carrera — Fundador y CEO de XANAEL
          </figcaption>
        </figure>

        {/* Texto final */}
        <p className="mt-12 text-gray-600 leading-relaxed pb-16">
          Gracias a todos los que os acercasteis al stand, compartisteis
          vuestra visión y dedicasteis tiempo a conocer XANAEL. Y gracias a
          ANECPLA por crear el espacio donde el sector se encuentra, reflexiona
          y crece unido. Las pruebas piloto comienzan. Los próximos pasos
          llegan pronto. Seguimos. 💚
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
      <NewsSection excludeSlug="expocida-2026" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
