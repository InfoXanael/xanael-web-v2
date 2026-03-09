import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NewsSection from "@/components/home/NewsSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XANAEL en EXPOCIDA 2026: dos días que marcan un antes y un después | Xanael",
};

export default async function Expocida2026Page() {
  const t = await getTranslations("NewsExpocida");
  const c = await getTranslations("Common");
  const cta = await getTranslations("NewsArticleCTA");

  return (
    <main className="pt-24">
      {/* Breadcrumb */}
      <div className="max-w-[900px] mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            {c("home")}
          </Link>
          <span>/</span>
          <Link href="/noticias" className="hover:text-[#2D6A4F] transition-colors">
            {c("news")}
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">{t("breadcrumb")}</span>
        </nav>
      </div>

      {/* Article header */}
      <header className="max-w-[900px] mx-auto px-6 pb-10">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          {t("category")}
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A4A3A] leading-tight">
          {t("title")}
        </h1>
        <time className="mt-4 block text-sm text-gray-400">
          {t("date")}
        </time>
        <p className="mt-4 text-gray-500 leading-relaxed">
          {t("excerpt")}
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
              alt={t("caption1")}
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            {t("caption1")}
          </figcaption>
        </figure>

        {/* Texto 1 */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          {t("p1")}
        </p>

        {/* stand-gente + texto 2 — dos columnas */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <figure className="md:w-[50%]">
            <Image
              src="/images/news/new-4/stand-gente.webp"
              alt={t("caption2")}
              width={900}
              height={600}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="mt-3 text-sm text-gray-400 text-center">
              {t("caption2")}
            </figcaption>
          </figure>
          <div className="md:w-[50%]">
            <p className="text-gray-600 leading-relaxed">
              {t("p2")}
            </p>
          </div>
        </div>

        {/* texto 3 + stand-general — dos columnas */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-[45%]">
            <p className="text-gray-600 leading-relaxed">
              {t("p3")}
            </p>
          </div>
          <figure className="md:w-[55%]">
            <div className="relative w-full min-h-[500px] bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/news/new-4/stand-general.webp"
                alt={t("caption3")}
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center">
              {t("caption3")}
            </figcaption>
          </figure>
        </div>

        {/* Grid 2 columnas: bordillos */}
        <figure className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative w-full aspect-[4/3] bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/news/new-4/bordillo-1.webp"
                alt={t("caption4")}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full aspect-[4/3] bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/news/new-4/bordillo-2.webp"
                alt={t("caption4")}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            {t("caption4")}
          </figcaption>
        </figure>

        {/* Texto 4 */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          {t("p4")}
        </p>

        {/* Carlos — contenida y centrada */}
        <figure className="mt-12 flex flex-col items-center">
          <div className="relative w-full max-w-[600px] aspect-[4/3] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-4/carlos.webp"
              alt={t("caption5")}
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            {t("caption5")}
          </figcaption>
        </figure>

        {/* Texto final */}
        <p className="mt-12 text-gray-600 leading-relaxed pb-16">
          {t("closing")}
        </p>
      </article>

      <div className="h-[1px] bg-gray-200 max-w-[900px] mx-auto" />

      {/* CTA */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {cta("title")}
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            {cta("text")}
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-block text-sm font-semibold bg-white text-[#1A1A1A] px-7 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            {cta("cta")}
          </Link>
        </div>
      </section>

      {/* Related news */}
      <NewsSection excludeSlug="expocida-2026" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
