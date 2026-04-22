"use client";

import { Shield, Leaf, Eye, Target } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [Shield, Leaf, Eye, Target];

export default function FeaturesStrip() {
  const t = useTranslations("FeaturesStrip");

  const features = [
    { Icon: icons[0], title: t("feature1Title"), description: t("feature1Desc") },
    { Icon: icons[1], title: t("feature2Title"), description: t("feature2Desc") },
    { Icon: icons[2], title: t("feature3Title"), description: t("feature3Desc") },
    { Icon: icons[3], title: t("feature4Title"), description: t("feature4Desc") },
  ];

  return (
    <section className="relative z-10 -mt-[88px] pb-12">
      <div className="bg-[#2D6A4F] shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-3 px-7 py-8">
              <f.Icon className="w-6 h-6 text-white/80" strokeWidth={1.5} />
              <h3 className="text-white font-bold text-base">{f.title}</h3>
              <p className="text-white/75 text-[0.875rem] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
