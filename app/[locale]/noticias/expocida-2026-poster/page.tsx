import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NewsSection from "@/components/home/NewsSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XANAEL presenta su póster técnico en EXPOCIDA 2026 | Xanael",
};

export default async function ExpocidaPosterPage() {
  const t = await getTranslations("NewsExpocidaPoster");
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
        {/* Two-column: poster left, text right */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-[45%] relative aspect-[3/4] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-3/poster.webp"
              alt="Póster técnico de XANAEL presentado en EXPOCIDA 2026"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-[55%]">
            <p className="text-gray-600 leading-relaxed">
              {t("p1")}
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {t("p2")}
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {t("p3")}
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {t("p4")}
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {t("p5")}
            </p>
          </div>
        </div>

        {/* Full-width image: portada */}
        <figure className="mt-16">
          <Image
            src="/images/news/new-3/portada.webp"
            alt="Stand de XANAEL en EXPOCIDA 2026"
            width={1200}
            height={800}
            className="max-w-[30%] h-auto rounded-md mx-auto"
          />
          <figcaption className="mt-3 text-sm text-gray-400 text-center">
            {t("imgCaption")}
          </figcaption>
        </figure>

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
      <NewsSection excludeSlug="expocida-2026-poster" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
