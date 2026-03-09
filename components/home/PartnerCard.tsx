"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function PartnerCard() {
  const t = useTranslations("Partner");

  return (
    <section className="py-24 bg-[#F0F4F2]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-xanael-dark rounded-md p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="md:max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 text-white/80 text-base">
              {t("text")}
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-xanael-accent text-white hover:bg-xanael-green">
            <Link href="/colaboradores">{t("cta")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
