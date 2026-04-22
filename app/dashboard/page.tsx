import { getDashboardStats } from "@/lib/db-queries";
import DashboardHomeClient from "@/components/dashboard/DashboardHomeClient";

export default async function DashboardPage() {
  const { recentForms, chartForms, newFormsCount, leadsCount } = await getDashboardStats();
  return (
    <DashboardHomeClient
      recentForms={recentForms}
      chartForms={chartForms}
      newFormsCount={newFormsCount}
      leadsCount={leadsCount}
    />
  );
}
