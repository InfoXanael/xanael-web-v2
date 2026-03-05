"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { Card, CardContent } from "@/components/ui/card";

const placeholderNews = [
  { title: "Noticia 1", excerpt: "Contenido de la noticia pendiente.", slug: "#" },
  { title: "Noticia 2", excerpt: "Contenido de la noticia pendiente.", slug: "#" },
  { title: "Noticia 3", excerpt: "Contenido de la noticia pendiente.", slug: "#" },
];

export default function NewsGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText as="h2" className="text-3xl font-bold text-xanael-dark tracking-tight">
          Noticias
        </AnimatedText>
        <AnimatedText as="p" delay={0.1} className="mt-3 text-gray-500">
          Ultimas novedades de Xanael
        </AnimatedText>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderNews.map((news, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-8 pt-8">
                  <span className="text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Articulo</span>
                  <div className="w-8 h-[1px] bg-xanael-green/30 my-4" />
                  <h3 className="text-lg font-semibold text-[#1A4A3A]">{news.title}</h3>
                  <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">{news.excerpt}</p>
                  <Link href={news.slug} className="mt-4 inline-block text-sm font-medium text-xanael-green hover:text-xanael-dark transition-colors">
                    Leer mas →
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/noticias" className="text-sm font-medium text-xanael-green hover:text-xanael-dark transition-colors">
            Ver todas las noticias →
          </Link>
        </div>
      </div>
    </section>
  );
}
