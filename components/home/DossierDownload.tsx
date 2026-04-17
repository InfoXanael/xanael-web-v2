import { FileText, Download } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function DossierDownload() {
  const t = useTranslations("Dossier");
  const locale = useLocale();

  const pdfFile = locale === "es"
    ? "/docs/dossier-xanael-es.pdf"
    : "/docs/dossier-xanael-en.pdf";

  return (
    <section className="bg-[#F0F4F2] pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white border border-gray-200 rounded-md px-8 py-7">
          <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-md bg-[#F0F4F2]">
            <FileText className="w-7 h-7 text-[#2D6A4F]" strokeWidth={1.5} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold tracking-wider uppercase text-[#2D6A4F]">
              {t("label")}
            </p>
            <p className="mt-1 text-gray-500 text-sm leading-relaxed max-w-xl">
              {t("desc")}
            </p>
          </div>

          <a
            href={pdfFile}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="shrink-0 inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#1A4A3A] text-white text-sm font-semibold px-5 py-3 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" strokeWidth={2} />
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
