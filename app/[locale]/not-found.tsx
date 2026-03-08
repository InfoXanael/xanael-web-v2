import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="min-h-screen bg-[#F0F4F2] flex flex-col items-center justify-center px-4">
      <Image
        src="/images/logo/logo.svg"
        alt="XANAEL"
        width={160}
        height={48}
        className="mb-8"
      />
      <h1 className="text-6xl font-bold text-[#1A4A3A] mb-2">{t("title")}</h1>
      <p className="text-lg text-[#1A1A1A] mb-6">{t("subtitle")}</p>
      <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
        {t("text")}
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[#2D6A4F] text-white text-sm font-medium rounded-md hover:bg-[#245a42] transition-colors"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
