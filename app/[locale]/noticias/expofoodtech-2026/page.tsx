import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NewsSection from "@/components/home/NewsSection";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "XANAEL en Food 4 Future – ExpoFoodTech 2026: infraestructura sanitaria en la industria alimentaria | Xanael",
    alternates: buildAlternates(locale, "/noticias/expofoodtech-2026"),
  };
}

export default async function ExpoFoodTech2026Page() {
  const t = await getTranslations("NewsExpoFoodTech");
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

        {/* Portada — dos personas en el balcón del BEC */}
        <figure>
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-5/portada.webp"
              alt={t("caption1")}
              fill
              className="object-cover"
              style={{ objectPosition: "center 65%" }}
              priority
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

        {/* Prototipo frente + texto 2 */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <figure className="md:w-[50%]">
            <Image
              src="/images/news/new-5/stand.webp"
              alt={t("caption2")}
              width={600}
              height={800}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="mt-3 text-sm text-gray-400 text-center">
              {t("caption2")}
            </figcaption>
          </figure>
          <div className="md:w-[50%]">
            <p className="text-gray-600 leading-relaxed">{t("p2")}</p>
          </div>
        </div>

        {/* Texto 3 + detalle prototipo */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-[50%]">
            <p className="text-gray-600 leading-relaxed">{t("p3")}</p>
          </div>
          <figure className="md:w-[50%]">
            <Image
              src="/images/news/new-5/stand-detalle.webp"
              alt={t("caption3")}
              width={600}
              height={800}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="mt-3 text-sm text-gray-400 text-center">
              {t("caption3")}
            </figcaption>
          </figure>
        </div>

        {/* Imagen instalación industrial — contexto */}
        <figure className="mt-12">
          <div className="relative w-full aspect-[16/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/ProductSection/img_4.webp"
              alt={t("caption4")}
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            {t("caption4")}
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
      <NewsSection excludeSlug="expofoodtech-2026" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
