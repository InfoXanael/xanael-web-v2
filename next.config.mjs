import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    minimumCacheTTL: 2592000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      // Páginas huérfanas fuera de [locale] — redirigir a equivalente en /es
      { source: "/producto", destination: "/es/infraestructuras", permanent: true },
      { source: "/es/producto", destination: "/es/infraestructuras", permanent: true },
      { source: "/sectores/ayuntamientos", destination: "/es/infraestructuras", permanent: true },
      { source: "/es/sectores/ayuntamientos", destination: "/es/infraestructuras", permanent: true },
      { source: "/sectores/control-de-plagas", destination: "/es/infraestructuras", permanent: true },
      { source: "/es/sectores/control-de-plagas", destination: "/es/infraestructuras", permanent: true },
      { source: "/sectores/industria", destination: "/es/infraestructuras", permanent: true },
      { source: "/es/sectores/industria", destination: "/es/infraestructuras", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
