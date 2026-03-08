import ClientLayout from "@/components/layout/ClientLayout";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
