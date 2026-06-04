"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Crosshair, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductSection() {
  const t = useTranslations("Product");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const benefits = [
    { icon: Crosshair, title: t("benefit1Title"), description: t("benefit1Desc") },
    { icon: Building2, title: t("benefit2Title"), description: t("benefit2Desc") },
  ];

  const accordions = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — texto */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[#1A4A3A] text-lg font-bold leading-none">+</span>
              <span className="text-sm font-semibold tracking-wider uppercase text-[#1A4A3A]">
                {t("label")}
              </span>
            </div>
            <h2 className="mt-3 text-4xl font-bold text-[#1A4A3A] leading-tight">
              {t("title")}
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">{t("desc1")}</p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {t("desc2")}
              <br />
              {t("desc2b")}
            </p>

            {/* Benefits */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                    <h3 className="text-[#1A4A3A] font-semibold text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Accordions */}
            <div className="mt-8 space-y-2">
              {accordions.map((item, i) => (
                <div key={i} className="border-b border-gray-200">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-4 text-left text-[#1A4A3A] font-medium text-sm hover:text-[#2D6A4F] transition-colors"
                  >
                    {item.question}
                    <svg
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === i && (
                    <div className="pb-4 text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — bordillo estándar flotante */}
          <div className="flex items-center justify-center py-12">
            <Link
              href="/infraestructuras"
              className="group relative block"
              style={{
                transform: "rotate(-5deg) translateY(-12px)",
                filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.28))",
              }}
            >
              <Image
                src="/images/infrastructure/standard_model/bordillo_1.webp"
                alt="Xanael Modelo Estándar"
                width={420}
                height={300}
                quality={90}
                sizes="(max-width: 1024px) 70vw, 420px"
                className="object-contain w-full max-w-[420px] transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[#1A4A3A]/0 group-hover:bg-[#1A4A3A]/35 transition-colors duration-400 rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white text-[#1A4A3A] font-semibold text-sm px-6 py-2.5 rounded-md shadow-lg">
                  Ver más
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
