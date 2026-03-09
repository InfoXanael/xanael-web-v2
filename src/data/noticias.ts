export interface Noticia {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string;
  extracto: string;
  imagen: string;
  href: string;
}

export const noticias: Noticia[] = [
  {
    slug: "ayuntalia-2025",
    titulo: "XANAEL en Ayuntalia 2025: primera presentación institucional del sistema",
    categoria: "Eventos",
    fecha: "20 de septiembre de 2025",
    extracto:
      "La feria Ayuntalia en Ribaforada fue el escenario elegido para la presentación pública del sistema XANAEL: una infraestructura urbana sanitaria preventiva diseñada para la gestión de plagas en superficie.",
    imagen: "/images/news/new-1/portada.webp",
    href: "/noticias/ayuntalia-2025",
  },
  {
    slug: "municipalia-2025",
    titulo: "XANAEL en Municipalia: Gran acogida del sistema de prevención de plagas urbanas",
    categoria: "Eventos",
    fecha: "23 de octubre de 2025",
    extracto:
      "Tres días de intenso intercambio con el sector público municipal confirmaron el interés creciente por soluciones estructurales en la gestión de plagas urbanas.",
    imagen: "/images/news/new-2/portada.webp",
    href: "/noticias/municipalia-2025",
  },
  {
    slug: "expocida-2026-poster",
    titulo: "XANAEL presenta su póster técnico en EXPOCIDA 2026",
    categoria: "Innovación",
    fecha: "31 de enero de 2026",
    extracto:
      "XANAEL participó en la convocatoria oficial de pósters técnicos y científicos de EXPOCIDA 2026, presentando su sistema de infraestructura urbana sanitaria preventiva en IFEMA Madrid.",
    imagen: "/images/news/new-3/portada.webp",
    href: "/noticias/expocida-2026-poster",
  },
  {
    slug: "expocida-2026",
    titulo: "XANAEL en EXPOCIDA 2026: dos días que marcan un antes y un después",
    categoria: "Eventos",
    fecha: "28 de febrero de 2026",
    extracto:
      "Dos días de conversaciones reales, preguntas técnicas y debates sobre el futuro de la sanidad ambiental. El sector coincide: la gestión de plagas ya no puede ser solo reactiva.",
    imagen: "/images/news/new-4/portada.webp",
    href: "/noticias/expocida-2026",
  },
];
