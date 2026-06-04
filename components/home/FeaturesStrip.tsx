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
    <section className="bg-white border-b border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col gap-3 px-8 py-10">
            <div className="w-10 h-10 rounded-md bg-[#F0F4F2] flex items-center justify-center">
              <f.Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#1A1A1A] font-bold text-base mt-1">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
