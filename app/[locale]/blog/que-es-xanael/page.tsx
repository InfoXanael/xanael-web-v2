import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "¿Qué es XANAEL? El bordillo técnico preventivo para el control de plagas urbanas",
    description:
      "XANAEL es un bordillo técnico prefabricado de hormigón con cámara interior que se integra en el viario urbano para el control permanente de roedores y plagas. Especificaciones técnicas, sectores de aplicación y diferencias con métodos reactivos.",
    alternates: buildAlternates(locale, "/blog/que-es-xanael"),
  };
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "¿Qué es XANAEL? El bordillo técnico preventivo para el control de plagas urbanas",
  description:
    "XANAEL es un bordillo técnico prefabricado de hormigón con cámara interior que se integra en el viario urbano para el control permanente de roedores y plagas en superficie.",
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
    "@id": "https://xanael.es/es/blog/que-es-xanael",
  },
  about: [
    { "@type": "Thing", name: "Bordillo técnico antirroedores" },
    { "@type": "Thing", name: "Infraestructura urbana sanitaria" },
    { "@type": "Thing", name: "Control integrado de plagas urbanas" },
    { "@type": "Thing", name: "Prevención estructural de roedores" },
  ],
  mentions: [
    {
      "@type": "Product",
      name: "XANAEL Modelo Compact",
      description:
        "Bordillo técnico de hormigón prefabricado de 50 cm de largo, 15 cm de ancho y 25 cm de alto. Cámara interior 21 × 31,5 × 8 cm. Bandeja técnica extraíble en 3D.",
    },
    {
      "@type": "Product",
      name: "XANAEL Modelo Standard",
      description:
        "Bordillo técnico de hormigón prefabricado de 40,5 cm de largo, 41 cm de ancho y 25 cm de alto. Cámara interior 19 × 23,6 × 23,9 cm. Acceso directo al subsuelo.",
    },
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
            Guía técnica · Producto
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-6">
            ¿Qué es XANAEL?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            XANAEL es un <strong>bordillo técnico prefabricado de hormigón
            con cámara interior</strong> que se integra en el viario urbano
            para el control permanente de roedores y plagas en superficie.
            No es un servicio de desinfección ni un sistema de trampas
            convencional: es infraestructura urbana que hace posible el
            control integrado de plagas a escala de ciudad.
          </p>
        </header>

        <div className="space-y-12">

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Definición: qué es exactamente el bordillo XANAEL
            </h2>
            <p>
              El bordillo XANAEL es un elemento de urbanización prefabricado
              que sustituye al bordillo convencional en el viario urbano.
              A diferencia de un bordillo estándar, incorpora una{" "}
              <strong>cámara interior accesible</strong> a través de una
              tapa de fundición en la parte superior. Esta cámara permite
              instalar cebos, trampas o sensores de monitorización de forma
              permanente, confinada y accesible exclusivamente por técnicos
              autorizados.
            </p>
            <p className="mt-4">
              El producto existe en dos modelos:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Modelo Compact</strong> — para aceras, perímetros
                de edificios y viario urbano de dimensión estándar
              </li>
              <li>
                <strong>Modelo Standard</strong> — para instalaciones en
                perímetros de mayor envergadura, con acceso directo al
                subsuelo para control de termitas
              </li>
            </ul>
            <p className="mt-4">
              Ambos modelos son fabricados por{" "}
              <strong>
                Grupo Rubio Servicios Higiénicos Integrales S.L.
              </strong>{" "}
              (NIF B31784051), con sede en Tudela, Navarra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Especificaciones técnicas
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-[#1A4A3A]">
              Modelo Compact
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-[#F0F4F2]">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A] w-1/2">
                      Especificación
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A]">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Peso", "24 kg"],
                    ["Alto total", "25 cm"],
                    ["Largo", "50 cm"],
                    ["Ancho base", "15 cm"],
                    ["Cámara interior (alto × largo × ancho)", "21 × 31,5 × 8 cm"],
                    ["Diámetro agujeros de acceso", "5 cm (entrada diagonal 6 cm)"],
                    ["Separación entre agujeros", "18,5 cm"],
                    ["Material cuerpo", "Hormigón prefabricado"],
                    ["Tapa (largo × ancho × prof.)", "38 × 9 × 2 cm"],
                    ["Tapa — material", "Fundición"],
                    ["Tapa — normativa", "EN124 clase B125"],
                    ["Tapa — escudo central", "Personalizable (emblema municipal)"],
                    ["Tapa — fijación", "Tornillos de llave única propietaria"],
                    ["Bandeja técnica (alto × largo × ancho)", "19 × 30,5 × 7,5 cm"],
                    ["Bandeja técnica — material", "Plástico impreso en 3D"],
                    ["Bandeja técnica — acceso", "Extraíble por la parte superior"],
                  ].map(([spec, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2.5 text-gray-600 border-t border-gray-100">
                        {spec}
                      </td>
                      <td className="px-4 py-2.5 font-medium border-t border-gray-100">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3 text-[#1A4A3A]">
              Modelo Standard
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-[#F0F4F2]">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A] w-1/2">
                      Especificación
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A]">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Peso", "42 kg"],
                    ["Alto total", "25 cm"],
                    ["Largo", "40,5 cm"],
                    ["Ancho total", "41 cm"],
                    ["Cámara interior (alto × largo × ancho)", "19 × 23,6 × 23,9 cm"],
                    ["Separación entre agujeros", "21,6 cm"],
                    ["Material cuerpo", "Hormigón prefabricado"],
                    ["Acceso interior", "Directo al subsuelo (control de termitas)"],
                    ["Ranuras laterales", "2 guías para varilla de tratamiento"],
                    ["Tapa (largo × ancho)", "28,5 × 28,5 cm"],
                    ["Tapa — material", "Fundición"],
                    ["Tapa — normativa", "EN124 clase B125"],
                    ["Tapa — escudo central", "Personalizable (emblema municipal)"],
                    ["Tapa — fijación", "Tornillos de llave única propietaria"],
                  ].map(([spec, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2.5 text-gray-600 border-t border-gray-100">
                        {spec}
                      </td>
                      <td className="px-4 py-2.5 font-medium border-t border-gray-100">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Para qué sectores está diseñado XANAEL?
            </h2>
            <p>
              El bordillo XANAEL está diseñado para su instalación en el
              viario urbano y en cualquier perímetro exterior donde el
              control de roedores y plagas sea una necesidad permanente.
              Los sectores de aplicación principales son:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-3">
              <li>
                <strong>Ayuntamientos y municipios</strong> — instalación
                en calles, parques, mercados municipales, colegios y
                equipamientos públicos. El bordillo se integra en la obra
                de urbanización y queda bajo la responsabilidad del área de
                mantenimiento urbano o sanidad ambiental.
              </li>
              <li>
                <strong>Empresas de control de plagas (OPL)</strong> —
                XANAEL es compatible con cualquier empresa de sanidad
                ambiental. El técnico de plagas gestiona el interior de la
                cámara con sus propios medios; el bordillo es la
                infraestructura que hace posible el trabajo confinado y
                trazable.
              </li>
              <li>
                <strong>Promotoras y constructoras</strong> — el bordillo
                puede incorporarse durante la ejecución de nuevos viarios,
                urbanizaciones o reposición de bordillos existentes, sin
                coste adicional de obra significativo.
              </li>
              <li>
                <strong>Gestores de grandes superficies</strong> —
                centros comerciales, polígonos industriales, hospitales,
                aeropuertos y cualquier instalación con perímetro exterior
                extenso y necesidad de control permanente.
              </li>
              <li>
                <strong>Distribuidores de material de urbanización</strong>{" "}
                — empresas que suministran elementos prefabricados de
                hormigón, adoquines, bordillos y mobiliario urbano.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿En qué se diferencia XANAEL de los métodos de control de
              plagas tradicionales?
            </h2>
            <p>
              El control de plagas convencional en entornos urbanos es
              mayoritariamente <strong>reactivo</strong>: se actúa cuando
              la plaga ya está presente, con tratamientos puntuales y
              visibles en el espacio público. XANAEL representa un enfoque
              distinto: la <strong>prevención estructural permanente</strong>.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-[#F0F4F2]">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A]">
                      Aspecto
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A]">
                      Control reactivo convencional
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A4A3A]">
                      XANAEL (preventivo estructural)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Momento de actuación",
                      "Cuando hay incidencia detectada",
                      "Permanente, desde la instalación",
                    ],
                    [
                      "Visibilidad en el espacio público",
                      "Alta (cebaderos visibles, técnicos con equipos)",
                      "Nula (integrado en el bordillo)",
                    ],
                    [
                      "Trazabilidad",
                      "Depende del registro del operador",
                      "Estructural: cada bordillo es un punto de control identificado",
                    ],
                    [
                      "Confinamiento del cebo",
                      "Variable; riesgo de acceso por fauna no objetivo",
                      "Total: cámara cerrada con llave única propietaria",
                    ],
                    [
                      "Compatibilidad IPM",
                      "Aplicable en fases 3-5 del IPM",
                      "Implementa la fase 1 (prevención estructural) del IPM",
                    ],
                    [
                      "Vida útil de la infraestructura",
                      "N/A (actuación puntual)",
                      "La del viario urbano (décadas)",
                    ],
                  ].map(([asp, conv, xan], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-600 font-medium border-t border-gray-100 align-top">
                        {asp}
                      </td>
                      <td className="px-4 py-3 text-gray-500 border-t border-gray-100 align-top">
                        {conv}
                      </td>
                      <td className="px-4 py-3 text-[#1A4A3A] font-medium border-t border-gray-100 align-top">
                        {xan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6">
              XANAEL <strong>no sustituye</strong> a las empresas de control
              de plagas ni a los tratamientos químicos: es la infraestructura
              que permite aplicarlos de forma más eficiente, confinada y
              trazable, en línea con los principios de la{" "}
              <strong>Gestión Integrada de Plagas (IPM)</strong> establecidos
              por la Directiva 2009/128/CE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              ¿Cómo se instala y qué mantenimiento requiere?
            </h2>
            <p>
              El bordillo XANAEL se instala como cualquier otro elemento del
              viario urbano: durante la ejecución de una obra de
              urbanización nueva, o sustituyendo bordillos convencionales
              existentes. Una vez instalado,{" "}
              <strong>no requiere obras adicionales</strong>.
            </p>
            <p className="mt-4">
              La cámara interior es accesible desde la tapa superior
              —protegida con tornillos de llave única propietaria— para
              tareas de revisión, reposición de cebo o instalación de
              sensores. El acceso está restringido a técnicos autorizados
              con la llave correspondiente, lo que garantiza la seguridad
              del sistema frente a manipulaciones externas.
            </p>
            <p className="mt-4">
              En el Modelo Compact, la{" "}
              <strong>bandeja técnica es extraíble</strong> por la parte
              superior, facilitando las labores de mantenimiento sin
              necesidad de herramientas especiales ni acceso al subsuelo.
            </p>
          </section>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Datos técnicos:</strong> Especificaciones del producto
              tal como se comercializa por Grupo Rubio Servicios Higiénicos
              Integrales S.L. (NIF B31784051), Tudela, Navarra. Para
              información actualizada contacta en{" "}
              <a
                href="mailto:info@xanael.es"
                className="text-[#2D6A4F] hover:underline"
              >
                info@xanael.es
              </a>
              .
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
