import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import SurfaceSection from "@/components/home/SurfaceSection";
import ProductSection from "@/components/home/ProductSection";
// import DossierDownload from "@/components/home/DossierDownload";
import NewsSection from "@/components/home/NewsSection";
import PartnerCard from "@/components/home/PartnerCard";
import Newsletter from "@/components/home/Newsletter";
import ManifestoSection from "@/components/home/ManifestoSection";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Xanael - Infraestructura Urbana Sanitaria Preventiva",
    description:
      "Infraestructura urbana sanitaria preventiva que prepara la ciudad frente a plagas en superficie. Prevén, monitoriza y actúa de forma segura y sostenible.",
    alternates: buildAlternates(locale, ""),
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <SurfaceSection />
      <ProductSection />
      {/* <DossierDownload /> */}
      <NewsSection />
      <PartnerCard />
      <ManifestoSection />
      <Newsletter />
    </>
  );
}
