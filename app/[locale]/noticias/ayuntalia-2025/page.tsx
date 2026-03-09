import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Shield, Leaf, Eye, Target } from "lucide-react";
import NewsSection from "@/components/home/NewsSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XANAEL en Ayuntalia 2025: primera presentación institucional del sistema | Xanael",
};

const pillarIcons = [Shield, Leaf, Eye, Target];

export default async function AyuntaliaPage() {
  const t = await getTranslations("NewsAyuntalia");
  const c = await getTranslations("Common");
  const cta = await getTranslations("NewsArticleCTA");

  const pillars = [
    { icon: pillarIcons[0], title: t("pillar1Title"), text: t("pillar1Text") },
    { icon: pillarIcons[1], title: t("pillar2Title"), text: t("pillar2Text") },
    { icon: pillarIcons[2], title: t("pillar3Title"), text: t("pillar3Text") },
    { icon: pillarIcons[3], title: t("pillar4Title"), text: t("pillar4Text") },
  ];

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

        {/* Block 1: ministra — image right */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-[60%]">
            <p className="text-gray-600 leading-relaxed">
              {t("p2")}
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {t("p3")}
            </p>
          </div>
          <div className="md:w-[40%] relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-1/ayuntalia-2025-2.webp"
              alt="Visita de la ministra Elma Saiz al stand de XANAEL"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bridge paragraph */}
        <p className="mt-12 text-gray-600 leading-relaxed">
          {t("p4")}
        </p>

        {/* Block 2: stand — image left */}
        <div className="mt-12 flex flex-col md:flex-row-reverse gap-8 items-start">
          <div className="md:w-[50%]">
            <p className="text-gray-600 leading-relaxed">
              {t("p5")}
            </p>
          </div>
          <div className="md:w-[50%] relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-1/ayuntalia-2025-1.webp"
              alt="Stand de XANAEL en Ayuntalia 2025"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1A4A3A]">
            {t("pillarsTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex gap-4 items-start bg-[#F0F4F2] rounded-md p-5"
                >
                  <Icon
                    className="w-6 h-6 text-[#2D6A4F] shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-semibold text-[#1A4A3A]">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full-width image */}
        <figure className="mt-16">
          <div className="relative w-full aspect-[21/9] bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src="/images/news/new-1/ayuntalia-2025-3.webp"
              alt={t("imgCaption")}
              fill
              className="object-cover object-[center_35%]"
            />
          </div>
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
      <NewsSection excludeSlug="ayuntalia-2025" bgColor="bg-[#F0F4F2]" />
    </main>
  );
}
