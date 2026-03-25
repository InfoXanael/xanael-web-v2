"use client";

import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XE9J0TJ7CW"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XE9J0TJ7CW');
        `}
      </Script>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
