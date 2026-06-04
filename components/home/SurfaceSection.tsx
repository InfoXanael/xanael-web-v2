"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

const VIDEO_ID = "ztZ8FHfuzbQ";

export default function SurfaceSection() {
  const t = useTranslations("Surface");
  const [active, setActive] = useState(false);

  return (
    <section className="py-24 bg-[#1A4A3A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t("title")}
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed text-lg" dangerouslySetInnerHTML={{
              __html: t.raw("text")
                .replace("<bold>", '<strong class="text-white">')
                .replace("</bold>", "</strong>")
            }} />
          </div>

          <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-2xl ring-1 ring-white/10">
            {active ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&autoplay=1`}
                title={t("videoTitle")}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={() => setActive(true)}
                className="group absolute inset-0 w-full h-full"
                aria-label={t("videoTitle")}
              >
                <Image
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt={t("videoTitle")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 text-[#2D6A4F] ml-1" fill="#2D6A4F" />
                  </div>
                </div>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
