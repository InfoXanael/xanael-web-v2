import ClientLayout from "@/components/layout/ClientLayout";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XANAEL",
  description:
    "Infraestructura urbana sanitaria preventiva. Bordillo técnico prefabricado con cavidad interior para control de roedores y plagas en perímetros urbanos.",
  url: "https://xanael.es",
  logo: {
    "@type": "ImageObject",
    url: "https://xanael.es/images/favicon/web-app-manifest-512x512.png",
    width: 512,
    height: 512,
  },
  email: "info@xanael.es",
  parentOrganization: {
    "@type": "Organization",
    name: "Grupo Rubio Servicios Higiénicos Integrales S.L.",
    taxID: "B31784051",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tudela",
      addressRegion: "Navarra",
      addressCountry: "ES",
    },
  },
  sameAs: [
    "https://www.linkedin.com/in/xanael/",
    "https://www.facebook.com/profile.php?id=61588120254957",
    "https://www.instagram.com/xanael.es/",
  ],
};

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ClientLayout>{children}</ClientLayout>
    </>
  );
}
