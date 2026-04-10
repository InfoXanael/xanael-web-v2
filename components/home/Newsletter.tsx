"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/mautic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#2D6A4F] pb-32">
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="h-[1px] bg-white/20 mb-12" />
        <h3 className="text-lg font-semibold text-white">{t("title")}</h3>
        <p className="mt-2 text-sm text-white/70">
          {t("subtitle")}
        </p>

        {status === "success" ? (
          <p className="mt-5 text-sm text-white font-medium">
            {t("successMessage")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-4 max-w-lg">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 bg-transparent border border-white/30 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-[#2D6A4F] font-semibold text-sm px-6 py-2.5 rounded-md hover:bg-white/90 transition-colors shrink-0 disabled:opacity-60"
            >
              {status === "loading" ? t("subscribing") : t("subscribe")}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-300">
            {t("errorMessage")}
          </p>
        )}
      </div>
    </section>
  );
}
