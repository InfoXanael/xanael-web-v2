import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getFormularios = unstable_cache(
  async (tipo?: string, estado?: string) => {
    const where: Record<string, string> = {};
    if (tipo) where.tipo = tipo;
    if (estado) where.estado = estado;
    return prisma.formSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        tipo: true,
        nombre: true,
        email: true,
        telefono: true,
        empresa: true,
        sector: true,
        mensaje: true,
        estado: true,
        notas: true,
        syncMautic: true,
        createdAt: true,
      },
    });
  },
  ["formularios"],
  { revalidate: 60, tags: ["formularios"] }
);

export const getPipelineLeads = unstable_cache(
  async () => {
    return prisma.pipelineLead.findMany({
      orderBy: { updatedAt: "desc" },
    });
  },
  ["pipeline"],
  { revalidate: 60, tags: ["pipeline"] }
);

export const getPilotoSubmissions = unstable_cache(
  async () => {
    return prisma.pilotoSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["piloto"],
  { revalidate: 60, tags: ["piloto"] }
);

export const getDossierStats = unstable_cache(
  async () => {
    const [total, byCountry, byLocale, uniqueIps] = await Promise.all([
      prisma.dossierDownload.count(),
      prisma.dossierDownload.groupBy({
        by: ["country"],
        _count: { country: true },
        orderBy: { _count: { country: "desc" } },
        take: 6,
      }),
      prisma.dossierDownload.groupBy({
        by: ["locale"],
        _count: { locale: true },
      }),
      prisma.dossierDownload.groupBy({
        by: ["ip"],
        _count: { ip: true },
      }),
    ]);

    return {
      total,
      unique: uniqueIps.length,
      byCountry: byCountry.map((r) => ({
        country: r.country ?? "Desconocido",
        count: r._count.country,
      })),
      byLocale: byLocale.map((r) => ({
        locale: r.locale,
        count: r._count.locale,
      })),
    };
  },
  ["dossier-stats"],
  { revalidate: 300, tags: ["dossier-stats"] }
);

export const getDashboardStats = unstable_cache(
  async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [newFormsCount, leadsCount, recentForms, chartForms] = await Promise.all([
      prisma.formSubmission.count({ where: { estado: "nuevo" } }),
      prisma.pipelineLead.count(),
      prisma.formSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, nombre: true, tipo: true, estado: true, createdAt: true },
      }),
      prisma.formSubmission.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
    ]);

    return { newFormsCount, leadsCount, recentForms, chartForms };
  },
  ["dashboard-stats"],
  { revalidate: 60, tags: ["formularios", "pipeline"] }
);
