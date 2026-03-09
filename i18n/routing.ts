import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "fr", "it", "pt"],
  defaultLocale: "es",
  localePrefix: "always",
});
