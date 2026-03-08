import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Distributors");
  return {
    title: `${t("title")} - Xanael`,
  };
}

export default async function DistribuidoresPage() {
  const t = await getTranslations("Distributors");

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold text-xanael-dark tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg text-xanael-text/80 max-w-2xl">
          {t("text")}
        </p>
      </div>
    </div>
  );
}
