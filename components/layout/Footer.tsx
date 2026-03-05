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
            <h4 className="font-semibold mb-4">Navegacion</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-xanael-accent transition-colors">Inicio</Link></li>
              <li><Link href="/producto" className="hover:text-xanael-accent transition-colors">Producto</Link></li>
              <li><Link href="/noticias" className="hover:text-xanael-accent transition-colors">Noticias</Link></li>
              <li><Link href="/contacto" className="hover:text-xanael-accent transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Tudela, Navarra, Espana</li>
              <li><a href="tel:+34678455121" className="hover:text-xanael-accent transition-colors">+34 678 455 121</a></li>
              <li><a href="mailto:info@xanael.com" className="hover:text-xanael-accent transition-colors">info@xanael.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Xanael. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
