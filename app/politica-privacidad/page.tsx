import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | XANAEL",
  description: "Política de privacidad de XANAEL. Información sobre el tratamiento de datos personales.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-[#1A4A3A] mb-8">
          Política de Privacidad
        </h1>

        <div className="bg-white rounded-md border border-gray-200 p-8 space-y-6 text-sm text-[#1A1A1A] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              1. Responsable del tratamiento
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
              2. Datos que recopilamos
            </h2>
            <p>
              A través de los formularios de nuestra web (contacto comercial, colaboradores,
              distribuidores e incidencias), recopilamos los siguientes datos personales:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Empresa y sector (cuando aplica)</li>
              <li>Mensaje o descripción de la consulta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              3. Finalidad del tratamiento
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responder a consultas comerciales y solicitudes de información.</li>
              <li>Gestionar relaciones con colaboradores y distribuidores.</li>
              <li>Tramitar incidencias técnicas relacionadas con nuestros productos.</li>
              <li>Enviar comunicaciones comerciales si el usuario ha dado su consentimiento expreso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              4. Almacenamiento de datos
            </h2>
            <p>
              Los datos enviados a través de los formularios se almacenan en una base de datos
              propia alojada en el servidor de GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L.
              Estos datos son accesibles exclusivamente a través de un panel de administración
              interno protegido con autenticación segura (cookies httpOnly), al que solo tiene
              acceso el personal autorizado.
            </p>
            <p className="mt-2">
              Adicionalmente, los datos de contactos comerciales y distribuidores pueden
              sincronizarse con nuestra plataforma de marketing (Mautic), alojada en
              servidores propios, con el fin de gestionar comunicaciones y seguimiento comercial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              5. Conservación de los datos
            </h2>
            <p>
              Los datos personales se conservarán mientras exista una relación comercial o
              interés legítimo, y en todo caso durante los plazos legalmente establecidos.
              Podrá solicitar su eliminación en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              6. Derechos del usuario
            </h2>
            <p>Puede ejercer sus derechos de:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Acceso, rectificación y supresión de sus datos.</li>
              <li>Limitación y oposición al tratamiento.</li>
              <li>Portabilidad de los datos.</li>
            </ul>
            <p className="mt-2">
              Para ejercer estos derechos, escriba a{" "}
              <a href="mailto:info@xanael.es" className="text-[#2D6A4F] underline">
                info@xanael.es
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">
              7. Seguridad
            </h2>
            <p>
              XANAEL aplica medidas técnicas y organizativas para proteger los datos personales
              frente a accesos no autorizados, pérdida o destrucción. El acceso al panel de
              administración está protegido mediante autenticación segura y solo es accesible
              por personal autorizado.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
