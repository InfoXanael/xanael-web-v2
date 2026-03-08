import Hero from "@/components/home/Hero";
import SurfaceSection from "@/components/home/SurfaceSection";
import ProductSection from "@/components/home/ProductSection";
import NewsSection from "@/components/home/NewsSection";
import PartnerCard from "@/components/home/PartnerCard";
import Newsletter from "@/components/home/Newsletter";
import ManifestoSection from "@/components/home/ManifestoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SurfaceSection />
      <ProductSection />
      <NewsSection />
      <PartnerCard />
      <ManifestoSection />
      <Newsletter />
    </>
  );
}
