import type { MetadataRoute } from "next";

const BASE = "https://xanael.es";
const LOCALES = ["es", "en", "fr", "it", "pt"];

const PUBLIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
  { path: "/infraestructuras", priority: 0.9, changeFrequency: "monthly" },
  { path: "/noticias", priority: 0.8, changeFrequency: "weekly" },
  { path: "/noticias/ayuntalia-2025", priority: 0.7, changeFrequency: "monthly" },
  { path: "/noticias/municipalia-2025", priority: 0.7, changeFrequency: "monthly" },
  { path: "/noticias/expocida-2026", priority: 0.7, changeFrequency: "monthly" },
  { path: "/noticias/expocida-2026-poster", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" },
  { path: "/colaboradores", priority: 0.7, changeFrequency: "monthly" },
  { path: "/distribuidores", priority: 0.7, changeFrequency: "monthly" },
  { path: "/piloto", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/aviso-legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/politica-privacidad", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of PUBLIC_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  return entries;
}
