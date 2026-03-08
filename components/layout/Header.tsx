"use client";

import Image from "next/image";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const languages = [
  { code: "es" as const, label: "Español", flag: "https://flagcdn.com/es.svg" },
  { code: "en" as const, label: "English", flag: "https://flagcdn.com/gb.svg" },
  { code: "fr" as const, label: "Français", flag: "https://flagcdn.com/fr.svg" },
  { code: "it" as const, label: "Italiano", flag: "https://flagcdn.com/it.svg" },
  { code: "pt" as const, label: "Português", flag: "https://flagcdn.com/pt.svg" },
];

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [, startTransition] = useTransition();

  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/infraestructuras" as const, label: t("infrastructure") },
    { href: "/colaboradores" as const, label: t("collaborators") },
    { href: "/noticias" as const, label: t("news") },
    { href: "/nosotros" as const, label: t("about") },
  ];

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

  function switchLocale(newLocale: string) {
    setLangOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

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
              <img src={currentLang.flag} alt={currentLang.code} width={20} height={14} className="inline-block" />
              <span>{currentLang.code.toUpperCase()}</span>
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
                    onClick={() => switchLocale(lang.code)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                      locale === lang.code
                        ? "bg-gray-100 text-xanael-green font-medium"
                        : "text-xanael-text hover:bg-gray-50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lang.flag} alt={lang.code} width={20} height={14} className="inline-block" />
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contacto"
            className="text-sm font-semibold px-5 py-2.5 rounded-md bg-[#2D6A4F] text-white hover:bg-xanael-dark transition-all duration-300"
          >
            {t("contact")}
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
                    onClick={() => switchLocale(lang.code)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors rounded-md ${
                      locale === lang.code
                        ? "bg-gray-100 text-xanael-green font-medium"
                        : "text-xanael-text hover:bg-gray-50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lang.flag} alt={lang.code} width={20} height={14} className="inline-block" />
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold bg-xanael-green text-white px-5 py-2.5 rounded-md text-center hover:bg-xanael-dark transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
