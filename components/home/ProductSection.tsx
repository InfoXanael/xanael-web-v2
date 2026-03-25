"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";

const defaultImage = "/images/ProductSection/img_1.webp";

export default function ProductSection() {
  const t = useTranslations("Product");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const benefits = [
    { icon: Shield, title: t("benefit1Title"), description: t("benefit1Desc") },
    { icon: Leaf, title: t("benefit2Title"), description: t("benefit2Desc") },
  ];

  const accordions = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const activeView = openIndex !== null ? openIndex : -1;

  return (
    <section className="py-24 bg-[#F0F4F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Left column */}
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
            <p className="mt-5 text-gray-500 leading-relaxed">
              {t("desc1")}
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {t("desc2")}
              <br />
              {t("desc2b")}
            </p>

            {/* Benefits card */}
            <div className="relative mt-8 rounded-md p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/images/textura-hormigon.webp')" }}>
              <div className="absolute inset-0 bg-[#2D6A4F]/90" />
              {benefits.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="relative">
                    <Icon className="w-6 h-6 text-white/80 mb-3" strokeWidth={1.5} />
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="mt-1 text-white/75 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Accordions */}
            <div className="mt-8 space-y-3">
              {accordions.map((item, i) => (
                <div
                  key={i}
                  className="relative border border-gray-200 rounded-md overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/textura-hormigon.webp')" }}
                >
                  <div className="absolute inset-0 bg-white/[0.85]" />
                  <button
                    onClick={() => toggle(i)}
                    className="relative w-full flex items-center justify-between px-5 py-4 text-left text-[#1A4A3A] font-medium hover:bg-white/50 transition-colors"
                  >
                    {item.question}
                    <svg
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openIndex === i && (
                    <div className="relative px-5 pb-4 text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — dynamic image */}
          <div className="relative w-full bg-[#2A2A2A] rounded-md overflow-hidden">
            <Image
              src={defaultImage}
              alt="Producto Xanael"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-opacity duration-300 ${
                activeView === -1 ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/images/ProductSection/img_2.webp"
              alt="Cómo funciona Xanael"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-opacity duration-300 ${
                activeView === 0 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
                activeView === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full h-1/2">
                <Image
                  src="/images/ProductSection/img_3.webp"
                  alt="Para quién es Xanael"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
                />
              </div>
              <div className="h-[2px] bg-[#2D6A4F] shrink-0" />
              <div className="relative w-full h-1/2">
                <Image
                  src="/images/ProductSection/img_4.webp"
                  alt="Sectores Xanael"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
