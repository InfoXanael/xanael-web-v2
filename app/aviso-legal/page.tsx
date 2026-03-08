import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | XANAEL",
  description: "Aviso legal de XANAEL. Información legal y condiciones de uso del sitio web.",
};

export default function AvisoLegalPage() {
  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-[#1A4A3A] mb-8">
          Aviso Legal
        </h1>

        <div className="bg-white rounded-md border border-gray-200 p-8 space-y-6 text-sm text-[#1A1A1A] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              1. Datos identificativos
            </h2>
            <p>
              <strong>GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L.</strong><br />
              NIF: B31784051<br />
              Domicilio: Polígono Ultrapuertos, Nave 1, 31500 Tudela, Navarra<br />
              Teléfono: 678 455 121<br />
              Email: info@xanael.es<br />
              Web: xanael.es
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              2. Objeto
            </h2>
            <p>
              El presente aviso legal regula el uso del sitio web xanael.es,
              propiedad de GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L. El acceso y uso de este sitio web atribuye la
              condición de usuario e implica la aceptación plena de las condiciones
              aquí establecidas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              3. Propiedad intelectual
            </h2>
            <p>
              Todos los contenidos del sitio web (textos, imágenes, logotipos, diseños,
              código fuente, marcas y demás elementos) son propiedad de GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L. o de
              sus legítimos titulares, y están protegidos por las leyes de propiedad
              intelectual e industrial. Queda prohibida su reproducción, distribución o
              transformación sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              4. Tratamiento de datos
            </h2>
            <p>
              Los datos personales facilitados a través de los formularios del sitio web
              se almacenan en una base de datos propia alojada en el servidor de
              GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L. El acceso a estos datos
              está restringido a personal autorizado mediante un panel de administración
              interno protegido con autenticación segura.
            </p>
            <p className="mt-2">
              Para más información, consulte nuestra{" "}
              <a href="/politica-privacidad" className="text-[#2D6A4F] underline">
                Política de Privacidad
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              5. Responsabilidad
            </h2>
            <p>
              GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L. no se hace responsable de los daños o perjuicios que puedan
              derivarse de interferencias, omisiones, interrupciones, virus informáticos,
              averías telefónicas o desconexiones en el funcionamiento operativo del sistema,
              así como de retrasos o bloqueos en el uso causados por deficiencias o
              sobrecargas en servidores o en internet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              6. Enlaces externos
            </h2>
            <p>
              Este sitio web puede contener enlaces a páginas de terceros. GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L. no
              asume responsabilidad alguna por el contenido, políticas de privacidad o
              prácticas de sitios web de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              7. Legislación aplicable
            </h2>
            <p>
              Para la resolución de cualquier controversia derivada del uso de este sitio
              web, será de aplicación la legislación española.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
