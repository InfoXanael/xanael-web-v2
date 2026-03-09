import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Xanael - Infraestructura Urbana Sanitaria Preventiva",
  description:
    "Infraestructura urbana sanitaria preventiva que prepara la ciudad frente a plagas en superficie. Prevén, monitoriza y actúa de forma segura y sostenible.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      { url: "/images/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: "Xanael - Infraestructura Urbana Sanitaria Preventiva",
    description:
      "Infraestructura urbana sanitaria preventiva que prepara la ciudad frente a plagas en superficie. Prevén, monitoriza y actúa de forma segura y sostenible.",
    url: "https://xanael.es",
    siteName: "Xanael",
    locale: "es_ES",
    type: "website",
    images: [],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <Script
          defer
          data-domain="xanael.es"
          src="https://analytics.xanael.es/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
