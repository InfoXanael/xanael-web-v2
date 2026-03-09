import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("LegalNotice");
  return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function AvisoLegalPage() {
  const t = await getTranslations("LegalNotice");

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
              {t("s1Phone")}<br />
              Email: info@xanael.es<br />
              Web: xanael.es
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s2Title")}</h2>
            <p>{t("s2Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s3Title")}</h2>
            <p>{t("s3Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s4Title")}</h2>
            <p>{t("s4Text")}</p>
            <p className="mt-2">
              {t("s4LinkText")}{" "}
              <Link href="/politica-privacidad" className="text-[#2D6A4F] underline">
                {t("s4LinkLabel")}
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s5Title")}</h2>
            <p>{t("s5Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s6Title")}</h2>
            <p>{t("s6Text")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1A4A3A] mb-3">{t("s7Title")}</h2>
            <p>{t("s7Text")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
