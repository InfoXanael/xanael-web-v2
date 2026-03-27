"use client";

import { useTranslations } from "next-intl";

export default function SurfaceSection() {
  const t = useTranslations("Surface");

  return (
    <section className="py-24 bg-[#F0F4F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="-mt-24">
            <h2 className="text-4xl font-bold text-[#1A4A3A] leading-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{
              __html: t.raw("text")
                .replace("<bold>", '<strong class="text-[#1A4A3A]">')
                .replace("</bold>", "</strong>")
            }} />
          </div>

          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/ztZ8FHfuzbQ?rel=0"
              title={t("videoTitle")}
              allow="encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
