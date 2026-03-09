export interface Noticia {
  slug: string;
  cardKey: string;
  categoria: string;
  imagen: string;
  href: string;
  sortDate: string;
}

export const noticias: Noticia[] = [
  {
    slug: "ayuntalia-2025",
    cardKey: "ayuntalia2025",
    categoria: "events",
    imagen: "/images/news/new-1/portada.webp",
    href: "/noticias/ayuntalia-2025",
    sortDate: "2025-09-20",
  },
  {
    slug: "municipalia-2025",
    cardKey: "municipalia2025",
    categoria: "events",
    imagen: "/images/news/new-2/portada.webp",
    href: "/noticias/municipalia-2025",
    sortDate: "2025-10-23",
  },
  {
    slug: "expocida-2026-poster",
    cardKey: "expocidaPoster",
    categoria: "innovation",
    imagen: "/images/news/new-3/portada.webp",
    href: "/noticias/expocida-2026-poster",
    sortDate: "2026-01-31",
  },
  {
    slug: "expocida-2026",
    cardKey: "expocida2026",
    categoria: "events",
    imagen: "/images/news/new-4/portada.webp",
    href: "/noticias/expocida-2026",
    sortDate: "2026-02-28",
  },
];
