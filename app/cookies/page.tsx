import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | XANAEL",
  description: "Política de cookies de XANAEL. Información sobre las cookies utilizadas en nuestra web.",
};

export default function CookiesPage() {
  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-[#1A4A3A] mb-8">
          Política de Cookies
        </h1>

        <div className="bg-white rounded-md border border-gray-200 p-8 space-y-6 text-sm text-[#1A1A1A] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              1. ¿Qué son las cookies?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su
              navegador para recordar información sobre su visita, como sus preferencias
              o datos de sesión.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              2. Cookies que utilizamos
            </h2>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">Cookie</th>
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">Tipo</th>
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">Finalidad</th>
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-100 font-mono text-xs">dashboard_session</td>
                    <td className="px-4 py-2 border-b border-gray-100">Técnica</td>
                    <td className="px-4 py-2 border-b border-gray-100">
                      Autenticación del panel de administración interno. Solo se genera
                      cuando un administrador inicia sesión.
                    </td>
                    <td className="px-4 py-2 border-b border-gray-100">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              3. Cookies de terceros
            </h2>
            <p>
              Nuestra web puede incluir contenido embebido de terceros (como vídeos de YouTube)
              que pueden establecer sus propias cookies. XANAEL no controla estas cookies.
              Le recomendamos consultar las políticas de cookies de dichos servicios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              4. Gestión de cookies
            </h2>
            <p>
              Puede configurar su navegador para rechazar o eliminar cookies. Tenga en cuenta
              que desactivar las cookies técnicas puede afectar al funcionamiento de algunas
              funcionalidades del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              5. Contacto
            </h2>
            <p>
              Si tiene alguna duda sobre nuestra política de cookies, puede contactarnos en{" "}
              <a href="mailto:info@xanael.es" className="text-[#2D6A4F] underline">
                info@xanael.es
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
