import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NewsSection from "@/components/home/NewsSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XANAEL en Municipalia: Gran acogida del sistema de prevención | Xanael",
};

export default async function MunicipaliaPage() {
  const t = await getTranslations("NewsMunicipalia");
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
        <div className="mt-6 h-[1px] bg-gray-200" />
      </header>

      {/* Article body */}
      <article className="max-w-[900px] mx-auto px-6">
        {/* Intro */}
        <p className="text-gray-600 leading-relaxed">
          {t("p1")}
        </p>

        {/* Full-width image: stand */}
        <figure className="mt-12">
          <div className="relative w-full aspect-[21/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-2/municipalia-2.webp"
              alt="Stand de XANAEL en Municipalia 2025"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </figure>

        {/* Central paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          {t("p2")}
        </p>

        {/* Block: team image right */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-[55%]">
            <p className="text-gray-600 leading-relaxed">
              {t("p3")}
            </p>
          </div>
          <div className="md:w-[45%] relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-2/municipalia.webp"
              alt="Equipo de XANAEL en Municipalia 2025"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Closing paragraph */}
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
      <NewsSection excludeSlug="municipalia-2025" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
