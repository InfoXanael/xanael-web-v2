import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import SurfaceSection from "@/components/home/SurfaceSection";
import ProductSection from "@/components/home/ProductSection";
// import DossierDownload from "@/components/home/DossierDownload";
import NewsSection from "@/components/home/NewsSection";
import PartnerCard from "@/components/home/PartnerCard";
import Newsletter from "@/components/home/Newsletter";
import ManifestoSection from "@/components/home/ManifestoSection";

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
