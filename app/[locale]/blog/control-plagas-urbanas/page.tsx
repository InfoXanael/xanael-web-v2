import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "¿Qué es el control integrado de plagas en entornos urbanos? — XANAEL",
    description:
      "Guía sobre el IPM urbano: normativa europea (Directiva 2009/128/CE), principios de la Gestión Integrada de Plagas, prevención estructural y cómo los bordillos técnicos implementan la primera capa del control integrado.",
    alternates: buildAlternates(locale, "/blog/control-plagas-urbanas"),
  };
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "¿Qué es el control integrado de plagas en entornos urbanos?",
  description:
    "Guía sobre el IPM urbano: normativa europea, principios de la Gestión Integrada de Plagas, prevención estructural y el papel de los bordillos técnicos en el control integrado.",
  author: {
    "@type": "Organization",
    name: "XANAEL",
    url: "https://xanael.es",
  },
  publisher: {
    "@type": "Organization",
    name: "XANAEL",
    url: "https://xanael.es",
    logo: {
      "@type": "ImageObject",
      url: "https://xanael.es/images/favicon/web-app-manifest-512x512.png",
    },
  },
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://xanael.es/es/blog/control-plagas-urbanas",
  },
  about: [
    { "@type": "Thing", name: "Gestión Integrada de Plagas" },
    { "@type": "Thing", name: "Control de plagas urbanas" },
    { "@type": "Thing", name: "Directiva 2009/128/CE" },
    { "@type": "Thing", name: "IPM urbano" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16 text-[#1A1A1A]">
        <header className="mb-12">
          <p className="text-sm font-medium text-[#2D6A4F] uppercase tracking-widest mb-4">
            Guía técnica · Sanidad ambiental urbana
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-6">
            ¿Qué es el control integrado de plagas en entornos urbanos?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            El control de plagas en el medio urbano ha cambiado de forma
            profunda en las últimas décadas. El modelo de referencia hoy es
            el <strong>IPM</strong> (Integrated Pest Management), o{" "}
            <strong>Gestión Integrada de Plagas</strong> en español: un
            enfoque sistemático que prioriza la prevención estructural sobre
            la intervención química reactiva.
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-12">

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Qué es el IPM y por qué es la referencia en toda Europa?
            </h2>
            <p>
              El IPM no es un método concreto, sino un{" "}
              <strong>marco de decisión</strong> que establece el orden en
              que deben aplicarse las medidas de control. Combina
              herramientas biológicas, físicas, culturales y químicas para
              minimizar los riesgos para la salud humana, el medio ambiente
              y la biodiversidad. Su jerarquía de actuación es:
            </p>
            <ol className="list-decimal pl-6 mt-4 space-y-2">
              <li>
                <strong>Prevención</strong> — eliminar o reducir las
                condiciones que favorecen la proliferación de plagas
                actuando sobre el propio diseño del entorno
              </li>
              <li>
                <strong>Monitorización</strong> — detectar y evaluar la
                presencia de organismos nocivos antes de tomar decisiones
              </li>
              <li>
                <strong>Umbrales de intervención</strong> — actuar solo
                cuando la presencia supera niveles que justifican una
                respuesta
              </li>
              <li>
                <strong>Métodos no químicos</strong> — preferir soluciones
                físicas, mecánicas o biológicas
              </li>
              <li>
                <strong>Control químico como última opción</strong> —
                usar plaguicidas de forma selectiva y mínima cuando los
                métodos anteriores son insuficientes
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Qué establece la normativa europea sobre IPM urbano?
            </h2>
            <p>
              La{" "}
              <strong>
                Directiva 2009/128/CE del Parlamento Europeo y del Consejo
              </strong>
              , de 21 de octubre de 2009, establece el marco comunitario
              para el uso sostenible de los plaguicidas. Su Artículo 14
              obliga a todos los estados miembros a fomentar la gestión
              integrada de plagas y a garantizar que los usuarios
              profesionales apliquen sus principios desde el 1 de enero de
              2014.
            </p>
            <p className="mt-4">
              El Anexo III de la Directiva detalla los principios generales
              del IPM que deben aplicar los gestores de plagas:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Prevenir el desarrollo de poblaciones nocivas mediante{" "}
                <strong>buenas prácticas de diseño del entorno</strong>
              </li>
              <li>
                Realizar seguimiento de plagas con{" "}
                <strong>métodos y herramientas adecuados</strong> antes de
                actuar
              </li>
              <li>
                Justificar el uso de plaguicidas solo cuando se superan{" "}
                <strong>umbrales de intervención</strong> documentados
              </li>
              <li>
                Dar <strong>preferencia a los métodos no químicos</strong>{" "}
                cuando proporcionan un control satisfactorio
              </li>
            </ul>
            <p className="mt-4">
              En España, esta directiva fue transpuesta mediante el{" "}
              <strong>Real Decreto 1311/2012</strong>, de 14 de
              septiembre, sobre uso sostenible de productos
              fitosanitarios. Para el ámbito de la sanidad ambiental
              urbana, la{" "}
              <strong>
                Asociación Nacional de Empresas de Sanidad Ambiental
                (ANECPLA)
              </strong>{" "}
              ha desarrollado guías de buenas prácticas que concretan la
              aplicación de estos principios en municipios, comunidades de
              propietarios e infraestructuras públicas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Por qué la prevención estructural es la primera capa del
              IPM?
            </h2>
            <p>
              En la jerarquía IPM, la prevención ocupa el primer lugar
              porque intervenir en la fase de diseño del entorno es siempre
              más eficiente —técnica y económicamente— que actuar una vez
              que la plaga ya está establecida. En entornos urbanos, esto
              significa actuar sobre el propio diseño del espacio público
              para eliminar las condiciones que permiten que las plagas
              proliferen.
            </p>
            <p className="mt-4">
              Los roedores urbanos —principalmente{" "}
              <em>Rattus norvegicus</em> (rata parda) y{" "}
              <em>Rattus rattus</em> (rata negra)— necesitan tres elementos
              para establecerse:{" "}
              <strong>alimento, agua y refugio</strong>. El control
              estructural preventivo actúa sobre el tercer elemento:
              gestiona los puntos de refugio y acceso dentro del propio
              viario.
            </p>
            <p className="mt-4">
              Los bordillos, cunetas y el subviario urbano son las zonas de
              mayor actividad de roedores en el medio urbano. Son vías de
              circulación habitual, puntos de refugio y, frecuentemente,
              accesos al alcantarillado. La{" "}
              <strong>
                infraestructura preventiva integrada en el propio bordillo
              </strong>{" "}
              representa la implementación más directa del primer principio
              IPM: actuar en la fase de diseño, no de forma reactiva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Cómo complementa la infraestructura preventiva a los métodos
              químicos?
            </h2>
            <p>
              El uso de plaguicidas en entornos urbanos presenta
              limitaciones específicas que la normativa europea busca
              reducir progresivamente:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Restricciones de seguridad</strong> en espacios
                públicos de alta concurrencia (parques, colegios, mercados,
                zonas peatonales)
              </li>
              <li>
                <strong>Riesgo de resistencias</strong> cuando se usa
                rodenticida de forma continua y sin rotación ni
                planificación técnica
              </li>
              <li>
                <strong>Impacto sobre fauna no objetivo</strong>: rapaces,
                mustélidos y mascotas pueden verse afectados por cebos no
                confinados
              </li>
              <li>
                <strong>Coste de mantenimiento</strong> elevado cuando las
                actuaciones son reactivas y no se integran en un sistema
                planificado
              </li>
            </ul>
            <p className="mt-4">
              Un sistema de infraestructura preventiva no sustituye al
              control químico: lo <strong>racionaliza</strong>. Al actuar
              en la capa de prevención estructural, reduce la frecuencia
              con la que el control químico es necesario, concentra los
              puntos de intervención en ubicaciones definidas y controlables
              —las cavidades del bordillo—, y facilita la monitorización
              continua del perímetro urbano.
            </p>
            <p className="mt-4">
              Esto es, en términos IPM, exactamente el modelo previsto por
              la Directiva 2009/128/CE: el tratamiento químico pasa de ser
              la primera respuesta a ser la última, aplicada en puntos
              concretos y con criterio técnico documentable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Qué obligaciones tienen los municipios en materia de control
              de plagas?
            </h2>
            <p>
              Los ayuntamientos españoles tienen competencias directas en
              sanidad ambiental urbana. La{" "}
              <strong>
                Ley 7/1985 Reguladora de las Bases del Régimen Local
              </strong>{" "}
              les atribuye responsabilidades en salubridad pública. La{" "}
              <strong>Ley 33/2011 General de Salud Pública</strong>{" "}
              establece el marco para la prevención y el control de
              vectores y zoonosis.
            </p>
            <p className="mt-4">En la práctica, los municipios deben:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Mantener el alcantarillado y el viario en condiciones que
                no favorezcan la proliferación de vectores
              </li>
              <li>
                Actuar cuando la presencia de plagas representa un riesgo
                para la salud pública
              </li>
              <li>
                Documentar y registrar las actuaciones realizadas por
                empresas de control de plagas autorizadas
              </li>
              <li>
                Aplicar el principio de precaución ante riesgos para la
                salud derivados de vectores urbanos
              </li>
            </ul>
            <p className="mt-4">
              La adopción de soluciones de{" "}
              <strong>prevención estructural integrada en el viario</strong>{" "}
              es coherente con estas obligaciones y con los principios IPM
              que exige la normativa europea: permite planificar, documentar
              y auditar el control de plagas como parte del mantenimiento
              ordinario de la infraestructura urbana, sin depender
              exclusivamente de intervenciones reactivas y puntuales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Qué papel juegan los bordillos técnicos en el IPM urbano?
            </h2>
            <p>
              El bordillo técnico con cavidad interior —como el que
              desarrolla XANAEL— es una respuesta de ingeniería al primer
              principio del IPM: la prevención estructural. Al integrarse en
              el viario urbano existente, permite:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Monitorización permanente</strong> del perímetro
                urbano sin intervenciones visibles en el espacio público
              </li>
              <li>
                <strong>Confinamiento del control químico</strong>: los
                cebos quedan dentro de la cavidad, lejos del acceso de
                fauna no objetivo y personas
              </li>
              <li>
                <strong>Registro y trazabilidad</strong> de las
                actuaciones, alineado con los requisitos documentales de
                la normativa IPM
              </li>
              <li>
                <strong>Compatibilidad con sistemas IoT</strong> de
                monitorización remota para detección temprana
              </li>
            </ul>
            <p className="mt-4">
              En el contexto del IPM, el bordillo técnico no es un elemento
              de control de plagas por sí solo: es la{" "}
              <strong>infraestructura que hace posible aplicar el IPM
              a escala de ciudad</strong>, integrando la prevención
              estructural en el propio tejido urbano en lugar de tratarla
              como una actuación externa y periódica.
            </p>
          </section>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Fuentes y referencias normativas:</strong>{" "}
              Directiva 2009/128/CE del Parlamento Europeo y del Consejo
              (DO L 309, 24.11.2009) · Real Decreto 1311/2012, de 14 de
              septiembre (BOE núm. 223) · Ley 7/1985 Reguladora de las
              Bases del Régimen Local · Ley 33/2011 General de Salud
              Pública · ANECPLA (Asociación Nacional de Empresas de
              Sanidad Ambiental)
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
