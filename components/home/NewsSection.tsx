import Link from "next/link";
import Image from "next/image";
import { noticias } from "@/src/data/noticias";

interface NewsSectionProps {
  excludeSlug?: string;
  bgColor?: string;
}

export default function NewsSection({ excludeSlug, bgColor = "bg-[#F0F4F2]" }: NewsSectionProps) {
  const news = excludeSlug
    ? noticias.filter((n) => n.slug !== excludeSlug)
    : noticias;

  return (
    <section className={`py-24 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#1A4A3A] tracking-tight">
          Últimas noticias
        </h2>

        <div className="mt-12 flex flex-wrap gap-6">
          {news.map((item) => (
            <div
              key={item.slug}
              className="w-full max-w-[340px] bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative aspect-[3/2] bg-[#2A2A2A]">
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {item.categoria}
                </span>
                <h3 className="mt-2 text-base font-bold text-[#1A1A1A] leading-snug">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2">
                  {item.extracto}
                </p>
                <div className="mt-4 flex justify-end">
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-[#2D6A4F] hover:text-[#1A4A3A] transition-colors"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/noticias"
            className="inline-block text-sm font-semibold bg-[#1A4A3A] text-white px-7 py-3 rounded-md hover:bg-[#153d2f] transition-colors duration-300"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  );
}
