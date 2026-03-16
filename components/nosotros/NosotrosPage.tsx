"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ManifestoSection from "@/components/home/ManifestoSection";
import Newsletter from "@/components/home/Newsletter";

export default function NosotrosPage() {
  const t = useTranslations("About");
  const c = useTranslations("Common");

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
      <header className="max-w-7xl mx-auto px-6 pb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight max-w-4xl">
          {t("title")}
        </h1>
      </header>

      {/* Bloque texto grande */}
      <section className="bg-white py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug tracking-tight text-center">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Bloque origen */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-widest">
                {t("originTitle")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#1A1A1A] tracking-tight">
                {t("originTitle")}
              </h2>
              <p className="mt-6 text-gray-500 leading-relaxed">
                {t("originText1")}
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                {t("originText2")}
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                {t("originText3")}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full bg-[#E0E0E0] rounded-md overflow-hidden">
              <Image
                src="/images/AboutUs/expocida-fundadores.webp"
                alt="Carlos, Iñaki y José Javier Rubio Carrera, fundadores de XANAEL"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bloque innovación */}
      <section className="bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] w-full bg-[#2A2A2A] rounded-md overflow-hidden">
              <Image
                src="/images/AboutUs/bordillo-prototipo.webp"
                alt="Prototipo del bordillo XANAEL en stand"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                {t("innovationTitle")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white tracking-tight">
                {t("innovationTitle")}
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                {t("innovationText1")}
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                {t("innovationText2")}
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                {t("innovationText3")}
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                {t("innovationText4")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque equipo */}
      <section className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative w-full h-[500px] bg-[#E0E0E0] rounded-md overflow-hidden">
            <Image
              src="/images/AboutUs/expocida-equipo.webp"
              alt="El equipo de XANAEL en EXPOCIDA 2026"
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
            />
          </div>
          <div className="mt-12 max-w-2xl">
            <span className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-widest">
              {t("teamTitle")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#1A1A1A] tracking-tight">
              {t("teamTitle")}
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">
              {t("teamText1")}
            </p>
            <p className="mt-4 text-gray-500 leading-relaxed">
              {t("teamText2")}
            </p>
          </div>
        </div>
      </section>

      <ManifestoSection />
      <Newsletter />
    </div>
  );
}
