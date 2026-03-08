"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageCircle, Handshake, Wrench, Mail, MapPin, Linkedin } from "lucide-react";

/* ───────── contact types ───────── */

const contactTypes = [
  {
    id: "comercial",
    icon: User,
    title: "Información comercial",
    desc: "Municipios, industria, proyectos",
  },
  {
    id: "general",
    icon: MessageCircle,
    title: "Consulta general",
    desc: "Cualquier otra pregunta",
  },
  {
    id: "instalador",
    icon: Handshake,
    title: "Quiero ser partner",
    desc: "Red de colaboradores",
  },
  {
    id: "tecnico",
    icon: Wrench,
    title: "Soporte técnico",
    desc: "Incidencias o asistencia técnica",
  },
] as const;

type ContactType = (typeof contactTypes)[number]["id"];

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

/* ───────── contact info ───────── */

const contactInfo = [
  { icon: Mail, label: "Consultas generales", value: "info@xanael.es", href: "mailto:info@xanael.es" },
  { icon: Handshake, label: "Red de partners", value: "info@xanael.es", href: "mailto:info@xanael.es" },
  { icon: MapPin, label: "Sede", value: "Polígono Ultrapuertos, Nave 1, 31500 Tudela, Navarra", href: "" },
];

/* ───────── shared input classes ───────── */

const inputClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 transition-colors";

const selectClass =
  "w-full bg-transparent border border-white/25 rounded-md px-4 py-3 text-sm text-white outline-none focus:border-white/50 transition-colors appearance-none";

/* ───────── form components ───────── */

function RGPDCheckbox() {
  return (
    <label className="flex items-start gap-3 mt-6 cursor-pointer">
      <input
        type="checkbox"
        name="rgpd"
        required
        className="mt-1 w-4 h-4 rounded border-white/30 bg-transparent accent-white shrink-0"
      />
      <span className="text-xs text-white/60 leading-relaxed">
        He leído y acepto la{" "}
        <span className="underline">política de privacidad</span>. Tus datos serán tratados conforme al RGPD.
      </span>
    </label>
  );
}

function FormComercial() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder="Nombre completo" required className={inputClass} />
        <input type="email" name="email" placeholder="Email" required className={inputClass} />
        <input type="tel" name="telefono" placeholder="Teléfono" className={inputClass} />
        <input type="text" name="empresa" placeholder="Empresa / Organización" className={inputClass} />
      </div>
      <div className="mt-4 relative">
        <select name="sector" className={selectClass} defaultValue="">
          <option value="" disabled className="text-gray-900">
            Sector
          </option>
          <option value="ayuntamiento" className="text-gray-900">Ayuntamiento</option>
          <option value="industria" className="text-gray-900">Industria alimentaria</option>
          <option value="constructora" className="text-gray-900">Constructora</option>
          <option value="plagas" className="text-gray-900">Control de plagas</option>
          <option value="otro" className="text-gray-900">Otro</option>
        </select>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <textarea name="mensaje" placeholder="Mensaje" required rows={4} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        Enviar consulta
      </button>
    </>
  );
}

function FormGeneral() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder="Nombre" required className={inputClass} />
        <input type="email" name="email" placeholder="Email" required className={inputClass} />
      </div>
      <textarea name="mensaje" placeholder="Mensaje" required rows={4} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        Enviar
      </button>
    </>
  );
}

function FormInstalador() {
  return (
    <>
      <div className="relative mb-4">
        <select name="tipo_colaboracion" className={selectClass} defaultValue="">
          <option value="" disabled className="text-gray-900">Tipo de colaboración</option>
          <option value="instalador" className="text-gray-900">Instalador certificado</option>
          <option value="distribuidor" className="text-gray-900">Distribuidor</option>
          <option value="ambos" className="text-gray-900">Instalador y distribuidor</option>
          <option value="otro" className="text-gray-900">Otro</option>
        </select>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder="Nombre" required className={inputClass} />
        <input type="email" name="email" placeholder="Email" required className={inputClass} />
        <input type="tel" name="telefono" placeholder="Teléfono" className={inputClass} />
        <input type="text" name="empresa" placeholder="Empresa" className={inputClass} />
        <input type="text" name="provincia" placeholder="Provincia" className={inputClass} />
        <input type="text" name="experiencia" placeholder="Años de experiencia en el sector" className={inputClass} />
      </div>
      <textarea name="mensaje" placeholder="Mensaje" required rows={4} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        Solicitar información
      </button>
    </>
  );
}

function FormTecnico() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="nombre" placeholder="Nombre" required className={inputClass} />
        <input type="email" name="email" placeholder="Email" required className={inputClass} />
      </div>
      <input type="tel" name="telefono" placeholder="Teléfono" className={`${inputClass} mt-4`} />
      <textarea name="mensaje" placeholder="Descripción del problema" required rows={5} className={`${inputClass} mt-4 resize-none`} />
      <RGPDCheckbox />
      <button type="submit" className="mt-6 bg-white text-[#1A4A3A] font-semibold text-sm px-7 py-3 rounded-md hover:bg-white/90 transition-colors">
        Enviar
      </button>
    </>
  );
}

const forms: Record<ContactType, React.ReactNode> = {
  comercial: <FormComercial />,
  general: <FormGeneral />,
  instalador: <FormInstalador />,
  tecnico: <FormTecnico />,
};

/* ───────── main component ───────── */

export default function ContactPage() {
  const [active, setActive] = useState<ContactType>("comercial");

  return (
    <div className="pt-24 bg-[#F0F4F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#1A4A3A]">Contacto</span>
        </nav>
      </div>

      {/* Page header */}
      <header className="max-w-7xl mx-auto px-6 pb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A4A3A] tracking-tight">
          Contacto
        </h1>
        <p className="mt-4 text-gray-500 text-lg">
          Estamos aquí para ayudarte. Cuéntanos qué necesitas.
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
                onClick={() => setActive(ct.id)}
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
              <motion.form
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={(e) => e.preventDefault()}
                className="max-w-2xl"
              >
                {forms[active]}
              </motion.form>
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
        <h2 className="text-2xl font-bold text-[#1A4A3A] tracking-tight">Equipo</h2>

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
