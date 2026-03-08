"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { User, MessageCircle, Handshake, Wrench, Mail, MapPin, Linkedin } from "lucide-react";

/* ───────── contact type ids ───────── */

type ContactType = "comercial" | "general" | "instalador" | "tecnico";

const contactTypeIcons: Record<ContactType, typeof User> = {
  comercial: User,
  general: MessageCircle,
  instalador: Handshake,
  tecnico: Wrench,
};

/* ───────── team ───────── */

const team = [
  {
    initials: "CR",
    name: "Carlos Rubio Carrera",
    role: "CEO y Cofundador",
    email: "hola@xanael.es",
    linkedin: "https://www.linkedin.com/in/carlos-rubio-carrera-45140159/",
  },
  {
    initials: "IR",
    name: "Iñaki Rubio Carrera",
    role: "Cofundador",
    email: "",
    linkedin: "",
  },
  {
    initials: "JR",
    name: "Javier Rubio Carrera",
    role: "Cofundador",
    email: "",
    linkedin: "https://www.linkedin.com/in/javi-rubio-gr-687085131/",
  },
  {
    initials: "AM",
    name: "Ayoub Mejnoun Chegri",
    role: "Digital Manager",
    email: "info@xanael.es",
    linkedin: "https://www.linkedin.com/in/ayoub-mejnoun-chegri-5786132b4",
  },
];

/* ───────── shared input classes ───────── */

const inputClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

/* ───────── form components ───────── */

function RGPDCheckbox({ label }: { label: string }) {
  return (
    <label className="flex items-start gap-3 mt-6 cursor-pointer">
      <input
        type="checkbox"
        name="rgpd"
        required
        className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
      />
      <span className="text-xs text-white/60 leading-relaxed">
        {label}
      </span>
    </label>
  );
}

function FormComercial({ t }: { t: (key: string) => string }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder={t("name")} required className={inputClass} />
        <input type="email" name="email" placeholder={t("email")} required className={inputClass} />
        <input type="tel" name="telefono" placeholder={t("phone")} className={inputClass} />
        <input type="text" name="empresa" placeholder={t("company")} className={inputClass} />
      </div>
      <div className="mt-4 relative">
        <select name="sector" className={selectClass} defaultValue="">
          <option value="" disabled className="text-gray-900">
            {t("sector")}
          </option>
          <option value="ayuntamiento" className="text-gray-900">{t("sectorTownHall")}</option>
          <option value="industria" className="text-gray-900">{t("sectorIndustry")}</option>
          <option value="constructora" className="text-gray-900">{t("sectorConstruction")}</option>
          <option value="plagas" className="text-gray-900">{t("sectorPests")}</option>
          <option value="otro" className="text-gray-900">{t("sectorOther")}</option>
        </select>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <textarea name="mensaje" placeholder={t("message")} required rows={4} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox label={t("rgpd")} />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        {t("sendQuery")}
      </button>
    </>
  );
}

function FormGeneral({ t }: { t: (key: string) => string }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder={t("nameShort")} required className={inputClass} />
        <input type="email" name="email" placeholder={t("email")} required className={inputClass} />
      </div>
      <textarea name="mensaje" placeholder={t("message")} required rows={4} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox label={t("rgpd")} />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        {t("send")}
      </button>
    </>
  );
}

function FormInstalador({ t }: { t: (key: string) => string }) {
  return (
    <>
      <div className="relative mb-4">
        <select name="tipo_colaboracion" className={selectClass} defaultValue="">
          <option value="" disabled className="text-gray-900">{t("collabType")}</option>
          <option value="instalador" className="text-gray-900">{t("collabOAX")}</option>
          <option value="distribuidor" className="text-gray-900">{t("collabDistributor")}</option>
          <option value="ambos" className="text-gray-900">{t("collabBoth")}</option>
          <option value="otro" className="text-gray-900">{t("collabOther")}</option>
        </select>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder={t("nameShort")} required className={inputClass} />
        <input type="email" name="email" placeholder={t("email")} required className={inputClass} />
        <input type="tel" name="telefono" placeholder={t("phone")} className={inputClass} />
        <input type="text" name="empresa" placeholder={t("companyShort")} className={inputClass} />
        <input type="text" name="provincia" placeholder={t("province")} className={inputClass} />
        <input type="text" name="experiencia" placeholder={t("experience")} className={inputClass} />
      </div>
      <textarea name="mensaje" placeholder={t("message")} required rows={4} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox label={t("rgpd")} />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        {t("requestInfo")}
      </button>
    </>
  );
}

function FormTecnico({ t }: { t: (key: string) => string }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder={t("nameShort")} required className={inputClass} />
        <input type="email" name="email" placeholder={t("email")} required className={inputClass} />
      </div>
      <input type="tel" name="telefono" placeholder={t("phone")} className={`${inputClass} mt-4`} />
      <textarea name="mensaje" placeholder={t("problemDesc")} required rows={5} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox label={t("rgpd")} />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        {t("send")}
      </button>
    </>
  );
}

/* ───────── main component ───────── */

const TIPO_MAP: Record<ContactType, string> = {
  comercial: "comercial",
  general: "general",
  instalador: "instalador",
  tecnico: "incidencia",
};

export default function ContactPage() {
  const t = useTranslations("Contact");
  const c = useTranslations("Common");
  const [active, setActive] = useState<ContactType>("comercial");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const contactTypes: { id: ContactType; icon: typeof User; title: string; desc: string }[] = [
    { id: "comercial", icon: contactTypeIcons.comercial, title: t("commercial"), desc: t("commercialDesc") },
    { id: "general", icon: contactTypeIcons.general, title: t("general"), desc: t("generalDesc") },
    { id: "instalador", icon: contactTypeIcons.instalador, title: t("partner"), desc: t("partnerDesc") },
    { id: "tecnico", icon: contactTypeIcons.tecnico, title: t("technical"), desc: t("technicalDesc") },
  ];

  const contactInfo = [
    { icon: Mail, label: t("generalQueries"), value: "info@xanael.es", href: "mailto:info@xanael.es" },
    { icon: Handshake, label: t("partnerNetwork"), value: "info@xanael.es", href: "mailto:info@xanael.es" },
    { icon: MapPin, label: t("headquarters"), value: "Polígono Ultrapuertos, Nave 1, 31500 Tudela, Navarra", href: "" },
  ];

  const forms: Record<ContactType, React.ReactNode> = {
    comercial: <FormComercial t={t} />,
    general: <FormGeneral t={t} />,
    instalador: <FormInstalador t={t} />,
    tecnico: <FormTecnico t={t} />,
  };

  return (
    <div className="pt-24 bg-[#F0F4F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            {c("home")}
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">{t("breadcrumb")}</span>
        </nav>
      </div>

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 pb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A4A3A] tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          {t("subtitle")}
        </p>
      </header>

      {/* Selectors */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactTypes.map((ct) => {
            const Icon = ct.icon;
            const isActive = active === ct.id;
            return (
              <button
                key={ct.id}
                onClick={() => { setActive(ct.id); setFormStatus("idle"); }}
                className={`text-left p-5 rounded-md border transition-all duration-300 ${
                  isActive
                    ? "bg-[#1A4A3A] text-white border-[#1A4A3A] shadow-lg"
                    : "bg-white text-[#1A4A3A] border-gray-200 hover:border-[#2D6A4F]/40 hover:shadow-sm"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white/80" : "text-[#2D6A4F]"}`} strokeWidth={1.5} />
                <h3 className={`mt-3 text-sm font-semibold ${isActive ? "text-white" : "text-[#1A4A3A]"}`}>
                  {ct.title}
                </h3>
                <p className={`mt-1 text-xs leading-relaxed ${isActive ? "text-white/60" : "text-gray-400"}`}>
                  {ct.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic form */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            backgroundImage: "url('/images/textura-hormigon.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A4A3A]/[0.92]" />
          <div className="relative p-8 md:p-12">
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-2xl py-8"
                >
                  <p className="text-white text-lg font-semibold">
                    {t("successTitle")}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    {t("successText")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors"
                  >
                    {t("sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setFormStatus("loading");
                    const fd = new FormData(e.currentTarget);
                    try {
                      const res = await fetch("/api/formularios", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          tipo: TIPO_MAP[active],
                          nombre: fd.get("nombre") || "",
                          email: fd.get("email") || "",
                          telefono: fd.get("telefono") || "",
                          empresa: fd.get("empresa") || "",
                          sector: fd.get("sector") || "",
                          mensaje: fd.get("mensaje") || "",
                        }),
                      });
                      if (!res.ok) throw new Error();
                      setFormStatus("success");
                    } catch {
                      setFormStatus("error");
                    }
                  }}
                  className="max-w-2xl"
                >
                  {formStatus === "error" && (
                    <div className="mb-4 bg-red-500/20 border border-red-400/30 text-white text-sm rounded-md p-3">
                      {t("errorText")}
                    </div>
                  )}
                  {forms[active]}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <Icon className="w-5 h-5 text-[#2D6A4F]" strokeWidth={1.5} />
                <h4 className="mt-3 text-sm font-semibold text-[#1A4A3A]">{item.label}</h4>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-sm text-gray-500 hover:text-[#2D6A4F] transition-colors"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">{item.value}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-[1px] bg-gray-300/50 max-w-7xl mx-auto" />

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-[#1A4A3A] tracking-tight">{t("teamTitle")}</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((person) => (
            <div
              key={person.name}
              className="bg-[#E8EDE9] rounded-md p-6 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-wide">
                  {person.initials}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#1A1A1A]">{person.name}</h3>
              <p className="mt-1 text-xs text-[#555555]">{person.role}</p>

              <a
                href={`mailto:${person.email}`}
                className="mt-3 text-xs text-[#1A1A1A] hover:text-[#2D6A4F] transition-colors"
              >
                {person.email}
              </a>

              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#1A1A1A] hover:text-[#2D6A4F] transition-colors"
                >
                  <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
