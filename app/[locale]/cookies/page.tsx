import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CookiePolicy");
  return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function CookiesPage() {
  const t = await getTranslations("CookiePolicy");

  return (
    <main className="bg-[#F5F5F5] min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-[#1A4A3A] mb-8">
          {t("title")}
        </h1>

        <div className="bg-white rounded-md border border-gray-200 p-8 space-y-6 text-sm text-[#1A1A1A] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s1Title")}</h2>
            <p>
              <strong>GRUPO RUBIO SERVICIOS HIGIÉNICOS INTEGRALES S.L.</strong><br />
              NIF: B31784051<br />
              {t("s1Address")}<br />
              Email: info@xanael.es
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s2Title")}</h2>
            <p>{t("s2Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s3Title")}</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">Cookie</th>
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">{t("tableType")}</th>
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">{t("tablePurpose")}</th>
                    <th className="text-left px-4 py-2 border-b border-gray-200 font-semibold">{t("tableDuration")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-100 font-mono text-xs">dashboard_session</td>
                    <td className="px-4 py-2 border-b border-gray-100">{t("cookieType")}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{t("cookiePurpose")}</td>
                    <td className="px-4 py-2 border-b border-gray-100">{t("cookieDuration")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s4Title")}</h2>
            <p>{t("s4Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s5Title")}</h2>
            <p>{t("s5Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s6Title")}</h2>
            <p>
              {t("s6Text")}{" "}
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
