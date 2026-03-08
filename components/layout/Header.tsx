"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/infraestructuras", label: "Infraestructuras" },
  // { href: "/sectores/ayuntamientos", label: "Ayuntamientos" },
  // { href: "/sectores/control-de-plagas", label: "Control de Plagas" },
  // { href: "/sectores/industria", label: "Industria" },
  { href: "/colaboradores", label: "Colaboradores" },
  { href: "/noticias", label: "Noticias" },
  { href: "/nosotros", label: "Nosotros" },
];

const languages = [
  { code: "ES", label: "Español", flag: "https://flagcdn.com/es.svg" },
  { code: "EN", label: "English", flag: "https://flagcdn.com/gb.svg" },
  { code: "FR", label: "Français", flag: "https://flagcdn.com/fr.svg" },
  { code: "IT", label: "Italiano", flag: "https://flagcdn.com/it.svg" },
  { code: "PT", label: "Português", flag: "https://flagcdn.com/pt.svg" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const langRef = useRef<HTMLDivElement>(null);

  // On home page, transparent header uses white text (over dark hero)
  // On inner pages, transparent header uses dark text (over light backgrounds)
  const useWhiteText = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo/logo.webp"
            alt="Xanael"
            width={170}
            height={48}
            className={`hidden lg:block transition-all duration-300 ${
              useWhiteText ? "brightness-0 invert" : ""
            }`}
          />
          <Image
            src="/images/logo/logo.webp"
            alt="Xanael"
            width={120}
            height={34}
            className={`lg:hidden transition-all duration-300 ${
              useWhiteText ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                useWhiteText
                  ? "text-white hover:text-white/80"
                  : "text-xanael-dark hover:text-xanael-green"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 px-2 py-1 rounded-md ${
                useWhiteText
                  ? "text-white hover:text-white/80"
                  : "text-xanael-dark hover:text-xanael-green"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedLang.flag} alt={selectedLang.code} width={20} height={14} className="inline-block" />
              <span>{selectedLang.code}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-md border border-gray-100 rounded-md overflow-hidden min-w-[110px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                      selectedLang.code === lang.code
                        ? "bg-gray-100 text-xanael-green font-medium"
                        : "text-xanael-text hover:bg-gray-50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lang.flag} alt={lang.code} width={20} height={14} className="inline-block" />
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contacto"
            className="text-sm font-semibold px-5 py-2.5 rounded-md bg-[#2D6A4F] text-white hover:bg-xanael-dark transition-all duration-300"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${useWhiteText ? "bg-white" : "bg-xanael-dark"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${useWhiteText ? "bg-white" : "bg-xanael-dark"} ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${useWhiteText ? "bg-white" : "bg-xanael-dark"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-xanael-bg"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-xanael-text hover:text-xanael-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile language selector */}
              <div className="flex items-center gap-2 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors rounded-md ${
                      selectedLang.code === lang.code
                        ? "bg-gray-100 text-xanael-green font-medium"
                        : "text-xanael-text hover:bg-gray-50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lang.flag} alt={lang.code} width={20} height={14} className="inline-block" />
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>

              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold bg-xanael-green text-white px-5 py-2.5 rounded-md text-center hover:bg-xanael-dark transition-colors"
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
