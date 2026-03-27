"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, HardHat, HelpCircle } from "lucide-react";
import ManifestoSection from "@/components/home/ManifestoSection";
import Newsletter from "@/components/home/Newsletter";
import { useTranslations, useLocale } from "next-intl";

/* ───────── input classes ───────── */

const inputClass =
  "w-full bg-white/[0.08] border border-white/30 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-white/[0.08] border border-white/30 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

/* ───────── component ───────── */

export default function ColaboradoresPage() {
  const t = useTranslations("Collaborators");
  const c = useTranslations("Common");
  const locale = useLocale();

  const [interests, setInterests] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  /* ───────── form field refs via controlled state ───────── */
  const [fields, setFields] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    provincia: "",
    sector: "",
    experiencia: "",
    mensaje: "",
  });

  const setField = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  /* ───────── diagram nodes ───────── */

  const nodes = [
    { icon: Truck, label: t("distributor"), desc: t("distributorDesc"), interest: "distribuidor" },
    { icon: HardHat, label: t("oax"), desc: t("oaxDesc"), interest: "instalador" },
    { icon: HelpCircle, label: t("other"), desc: t("otherDesc"), interest: "otro" },
  ];

  /* ───────── steps ───────── */

  const steps = [
    { num: "1.", text: t("step1") },
    { num: "2.", text: t("step2") },
    { num: "3.", text: t("step3") },
  ];

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectAndScroll = (val: string) => {
    if (!interests.includes(val)) {
      setInterests((prev) => [...prev, val]);
    }
    setTimeout(() => {
      document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/formularios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "colaborador",
          nombre: fields.nombre,
          email: fields.email,
          telefono: fields.telefono,
          empresa: fields.empresa,
          sector: interests.join(", ") + (otherText ? ` (${otherText})` : ""),
          mensaje: fields.mensaje,
          locale,
        }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="pt-24 bg-[#F0F4F2] min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            {c("home")}
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">{t("breadcrumb")}</span>
        </nav>
      </div>

      {/* ── Header ── */}
      <header className="max-w-7xl mx-auto px-6 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A4A3A] tracking-tight leading-tight max-w-4xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-gray-500 text-lg leading-relaxed max-w-2xl"
        >
          {t("subtitle")}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={scrollToForm}
          className="mt-8 inline-block text-sm font-semibold bg-[#1A1A1A] text-white px-7 py-3 rounded-md hover:bg-[#333] transition-colors duration-300"
        >
          {t("joinCta")}
        </motion.button>
      </header>

      {/* ── Diagram ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div>
          {/* SVG diagram - desktop */}
          <div className="hidden md:block">
            <svg viewBox="0 0 800 380" className="w-full max-w-3xl mx-auto" fill="none">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#2D6A4F" />
                </marker>
              </defs>
              <line x1="320" y1="140" x2="165" y2="225" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="400" y1="175" x2="400" y2="232" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="480" y1="140" x2="635" y2="225" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </svg>

            <div className="relative -mt-[380px] h-[380px] max-w-3xl mx-auto">
              <div className="absolute left-1/2 top-[40px] -translate-x-1/2 w-[140px] h-[140px] rounded-full bg-[#2D6A4F] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg tracking-wide">XANAEL</span>
              </div>

              <div className="absolute left-[2%] top-[210px] group cursor-pointer" onClick={() => selectAndScroll("distribuidor")}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#D8DDD9] flex items-center justify-center mx-auto group-hover:bg-[#C8CEC9] group-hover:scale-[1.15] transition-all duration-300 ease-out">
                  <Truck className="w-6 h-6 text-[#2D6A4F]" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2D6A4F] text-center">{t("distributor")}</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">{t("distributorDesc")}</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-[265px] group cursor-pointer" onClick={() => selectAndScroll("instalador")}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#D8DDD9] flex items-center justify-center mx-auto group-hover:bg-[#C8CEC9] group-hover:scale-[1.15] transition-all duration-300 ease-out">
                  <HardHat className="w-6 h-6 text-[#2D6A4F]" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2D6A4F] text-center">{t("oax")}</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">{t.rich("oaxFull", { bold: (chunks) => <strong className="text-[#2D6A4F]">{chunks}</strong> })}</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">{t("oaxDesc")}</p>
              </div>

              <div className="absolute right-[2%] top-[210px] group cursor-pointer" onClick={() => selectAndScroll("otro")}>
                <div className="w-[90px] h-[90px] rounded-full bg-[#D8DDD9] flex items-center justify-center mx-auto group-hover:bg-[#C8CEC9] group-hover:scale-[1.15] transition-all duration-300 ease-out">
                  <HelpCircle className="w-6 h-6 text-[#2D6A4F]" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2D6A4F] text-center">{t("other")}</p>
                <p className="mt-1 text-xs text-gray-400 text-center max-w-[160px]">{t("otherDesc")}</p>
              </div>
            </div>
          </div>

          {/* Mobile: vertical layout */}
          <div className="md:hidden flex flex-col items-center gap-6">
            <div className="w-[120px] h-[120px] rounded-full bg-[#2D6A4F] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base tracking-wide">XANAEL</span>
            </div>
            <div className="w-[2px] h-8 bg-[#2D6A4F]" />
            <div className="grid grid-cols-1 gap-6 w-full max-w-xs">
              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.label} className="flex items-center gap-4 cursor-pointer" onClick={() => selectAndScroll(node.interest)}>
                    <div className="w-[64px] h-[64px] shrink-0 rounded-full bg-[#D8DDD9] flex items-center justify-center hover:bg-[#C8CEC9] hover:scale-[1.15] transition-all duration-300 ease-out">
                      <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A4A3A]">{node.label}</p>
                      <p className="text-xs text-gray-400">{node.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-[#1A4A3A] tracking-tight">{t("howTitle")}</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <span className="text-xl font-bold text-[#1A1A1A] leading-none shrink-0">
                {step.num}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formulario ── */}
      <section id="formulario" className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            backgroundImage: "url('/images/textura-hormigon.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#2A2A2A]/[0.95]" />
          <div className="relative p-8 md:p-12 lg:p-16">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t("formTitle")}
            </h2>

            {formStatus === "success" ? (
              <div className="mt-10 max-w-2xl py-8">
                <p className="text-white text-lg font-semibold">{t("successTitle")}</p>
                <p className="text-white/60 text-sm mt-2">{t("successText")}</p>
                <button
                  onClick={() => { setFormStatus("idle"); setFields({ nombre: "", email: "", telefono: "", empresa: "", provincia: "", sector: "", experiencia: "", mensaje: "" }); setInterests([]); }}
                  className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors"
                >
                  {t("sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 max-w-2xl">

                {formStatus === "error" && (
                  <div className="mb-6 bg-red-500/20 border border-red-400/30 text-white text-sm rounded-md p-3">
                    {t("errorText")}
                  </div>
                )}

                {/* Interest checkboxes */}
                <p className="text-sm font-semibold text-white/80 mb-4">
                  {t("interestedIn")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { val: "distribuidor", label: t("becomeDistributor") },
                    { val: "instalador", label: t("becomeOAX") },
                    { val: "ambos", label: t("distributorAndOAX") },
                    { val: "otro", label: t("other") },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-all duration-200 ${
                        interests.includes(opt.val)
                          ? "bg-white/15 border-white/50"
                          : "bg-white/[0.05] border-white/20 hover:border-white/35"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-[3px] border-2 flex items-center justify-center shrink-0 transition-colors ${
                          interests.includes(opt.val)
                            ? "bg-white border-white"
                            : "border-white/40 bg-transparent"
                        }`}
                      >
                        {interests.includes(opt.val) && (
                          <svg className="w-2.5 h-2.5 text-[#1A4A3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-white/90">{opt.label}</span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={interests.includes(opt.val)}
                        onChange={() => toggleInterest(opt.val)}
                      />
                    </label>
                  ))}
                </div>

                {/* Otro text field */}
                {interests.includes("otro") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <input
                      type="text"
                      placeholder={t("describeCollab")}
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      className={inputClass}
                    />
                  </motion.div>
                )}

                {/* Contact fields */}
                <p className="text-sm font-semibold text-white/80 mt-10 mb-4">
                  {t("contactData")}
                </p>

                <input
                  type="text"
                  placeholder={t("name")}
                  required
                  value={fields.nombre}
                  onChange={setField("nombre")}
                  className={`${inputClass} mb-4`}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="email" placeholder={t("email")} required value={fields.email} onChange={setField("email")} className={inputClass} />
                  <input type="tel" placeholder={t("phone")} value={fields.telefono} onChange={setField("telefono")} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <input type="text" placeholder={t("company")} value={fields.empresa} onChange={setField("empresa")} className={inputClass} />
                  <input type="text" placeholder={t("province")} value={fields.provincia} onChange={setField("provincia")} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="relative">
                    <select value={fields.sector} onChange={setField("sector")} className={selectClass}>
                      <option value="" disabled className="text-gray-900">{t("activitySector")}</option>
                      <option value="plagas" className="text-gray-900">{t("pestControl")}</option>
                      <option value="construccion" className="text-gray-900">{t("construction")}</option>
                      <option value="distribucion" className="text-gray-900">{t("distribution")}</option>
                      <option value="otro" className="text-gray-900">{t("other")}</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="relative">
                    <select value={fields.experiencia} onChange={setField("experiencia")} className={selectClass}>
                      <option value="" disabled className="text-gray-900">{t("yearsExperience")}</option>
                      <option value="0" className="text-gray-900">{t("lessThan1")}</option>
                      <option value="1-3" className="text-gray-900">{t("years1to3")}</option>
                      <option value="3-5" className="text-gray-900">{t("years3to5")}</option>
                      <option value="5+" className="text-gray-900">{t("moreThan5")}</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <textarea
                  placeholder={t("tellUs")}
                  rows={4}
                  value={fields.mensaje}
                  onChange={setField("mensaje")}
                  className={`${inputClass} mt-4 resize-none`}
                />

                {/* RGPD */}
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
                  />
                  <span className="text-xs text-white/60 leading-relaxed">
                    {t("rgpd")}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="mt-8 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors disabled:opacity-60"
                >
                  {formStatus === "loading" ? "..." : t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <ManifestoSection />
      <Newsletter />
    </div>
  );
}
