import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-xanael-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-4">XANAEL</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Infraestructura urbana sanitaria preventiva.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-xanael-accent transition-colors">Inicio</Link></li>
              <li><Link href="/infraestructuras" className="hover:text-xanael-accent transition-colors">Infraestructuras</Link></li>
              <li><Link href="/colaboradores" className="hover:text-xanael-accent transition-colors">Colaboradores</Link></li>
              <li><Link href="/noticias" className="hover:text-xanael-accent transition-colors">Noticias</Link></li>
              <li><Link href="/nosotros" className="hover:text-xanael-accent transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-xanael-accent transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Tudela, Navarra, Espana</li>
              <li><a href="tel:+34678455121" className="hover:text-xanael-accent transition-colors">+34 678 455 121</a></li>
              <li><a href="mailto:info@xanael.es" className="hover:text-xanael-accent transition-colors">info@xanael.es</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-sm text-white/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Xanael. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link href="/politica-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso legal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
