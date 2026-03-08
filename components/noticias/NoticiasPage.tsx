"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { noticias } from "@/src/data/noticias";
import { useTranslations } from "next-intl";
import ManifestoSection from "@/components/home/ManifestoSection";
import Newsletter from "@/components/home/Newsletter";

export default function NoticiasPage() {
  const t = useTranslations("NewsPage");
  const n = useTranslations("News");
  const c = useTranslations("Common");
  const [active, setActive] = useState("Todo");

  const categoryKeys = [
    { key: "all", original: "Todo" },
    { key: "events", original: "Eventos" },
    { key: "innovation", original: "Innovación" },
    { key: "xanael", original: "XANAEL" },
    { key: "installations", original: "Instalaciones" },
  ] as const;

  const filtered =
    active === "Todo"
      ? noticias
      : noticias.filter((item) => item.categoria === active);

  return (
    <div className="pt-24 bg-[#F5F5F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
            {c("home")}
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{t("breadcrumb")}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A4A3A] tracking-tight">
          {t("title")}
        </h1>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap gap-3">
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.original)}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                active === cat.original
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-[#F0F0F0] text-[#1A1A1A] border border-gray-200 hover:bg-[#E0E0E0]"
              }`}
            >
              {t(cat.key)}
            </button>
          ))}
        </div>
      </div>

      {/* News grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative aspect-[3/2] bg-[#E0E0E0]">
                  <Image
                    src={item.imagen}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {item.categoria}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-[#1A1A1A] leading-snug">
                    {item.titulo}
                  </h3>
                  <div className="mt-4">
                    <Link
                      href={item.href as "/noticias"}
                      className="text-sm font-medium text-[#1A1A1A] hover:text-gray-600 transition-colors"
                    >
                      {n("readMore")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">—</p>
        )}
      </div>

      {/* CTA */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            {t("ctaText")}
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-block text-sm font-semibold bg-white text-[#1A1A1A] px-7 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            {t("ctaCta")}
          </Link>
        </div>
      </section>

      <ManifestoSection />
      <Newsletter />
    </div>
  );
}
