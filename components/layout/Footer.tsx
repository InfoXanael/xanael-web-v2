import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const h = useTranslations("Header");

  return (
    <footer className="bg-xanael-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-4">XANAEL</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("navigation")}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-xanael-accent transition-colors">{h("home")}</Link></li>
              <li><Link href="/infraestructuras" className="hover:text-xanael-accent transition-colors">{h("infrastructure")}</Link></li>
              <li><Link href="/colaboradores" className="hover:text-xanael-accent transition-colors">{h("collaborators")}</Link></li>
              <li><Link href="/noticias" className="hover:text-xanael-accent transition-colors">{h("news")}</Link></li>
              <li><Link href="/nosotros" className="hover:text-xanael-accent transition-colors">{h("about")}</Link></li>
              <li><Link href="/contacto" className="hover:text-xanael-accent transition-colors">{h("contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{t("location")}</li>
              <li><a href="tel:+34678455121" className="hover:text-xanael-accent transition-colors">+34 678 455 121</a></li>
              <li><a href="mailto:info@xanael.es" className="hover:text-xanael-accent transition-colors">info@xanael.es</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-sm text-white/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} {t("rights")}</p>
            <div className="flex gap-4">
              <Link href="/politica-privacidad" className="hover:text-white transition-colors">{t("privacy")}</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">{t("cookies")}</Link>
              <Link href="/aviso-legal" className="hover:text-white transition-colors">{t("legal")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
