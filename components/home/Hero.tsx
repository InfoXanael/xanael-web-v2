"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative h-[80vh] flex items-center overflow-hidden">
      {/* Background image: parallax al hacer scroll + zoom lento (Ken Burns) */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, ease: "easeOut" }}
        >
          <Image
            src="/images/hero-bordillo-atardecer.webp"
            fill
            priority
            quality={95}
            sizes="100vw"
            alt="Infraestructura urbana sanitaria preventiva Xanael"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>
      {/* Overlay: degradado de marca (verde XANAEL) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A4A3A]/85 via-[#1A4A3A]/35 to-[#1A4A3A]/10" />
      {/* Vineta: oscurece bordes para centrar la mirada en el texto */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(10,30,22,0.55)_100%)]" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 flex justify-center">
        <div className="max-w-2xl text-center -translate-y-10 md:-translate-y-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            {t("title")}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 text-lg text-white/80 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="/contacto"
              className="inline-block text-sm font-semibold bg-[#2D6A4F] text-white px-7 py-3 rounded-md hover:bg-xanael-dark transition-colors duration-300"
            >
              {t("cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
