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
    titulo: "XANAEL en Ayuntalia 2025: primera presentación institucional",
    categoria: "Eventos",
    fecha: "20 de septiembre de 2025",
    extracto:
      "La feria Ayuntalia en Ribaforada fue el escenario de la presentación oficial del primer bordillo inteligente patentado en España para el control sostenible de plagas urbanas.",
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
];
