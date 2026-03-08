"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-banner.webp"
        fill
        priority
        alt="Infraestructura urbana inteligente Xanael"
        className="object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
          >
            Infraestructura urbana sanitaria preventiva
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6 text-lg text-white/80 leading-relaxed"
          >
            Sistema integrado en aceras y bordillos para la detección temprana
            y el control preventivo de plagas urbanas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mt-10"
          >
            <Link
              href="/contacto"
              className="inline-block text-sm font-semibold bg-[#2D6A4F] text-white px-7 py-3 rounded-md hover:bg-xanael-dark transition-colors duration-300"
            >
              Solicita información
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
