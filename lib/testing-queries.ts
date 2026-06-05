import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

export const getTestingStats = unstable_cache(
  async () => {
    const [sitiosActivos, dispositivosInstalados, totalMediciones, incidenciasAbiertas] =
      await Promise.all([
        prisma.testSite.count({ where: { estado: "activo" } }),
        prisma.testDispositivo.count({ where: { estado: "activo" } }),
        prisma.testMedicion.count(),
        prisma.testIncidencia.count({ where: { resuelta: false } }),
      ]);
    return { sitiosActivos, dispositivosInstalados, totalMediciones, incidenciasAbiertas };
  },
  ["testing-stats"],
  { revalidate: 60, tags: ["testing"] }
);

export const getTestingSites = unstable_cache(
  async (opts?: { estado?: string; municipio?: string }) => {
    return prisma.testSite.findMany({
      where: {
        ...(opts?.estado ? { estado: opts.estado } : {}),
        ...(opts?.municipio ? { municipio: { contains: opts.municipio, mode: "insensitive" } } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { dispositivos: true, mediciones: true, incidencias: true } },
      },
    });
  },
  ["testing-sites"],
  { revalidate: 60, tags: ["testing", "testing-sites"] }
);

export const getTestingSiteDetail = unstable_cache(
  async (id: string) => {
    return prisma.testSite.findUnique({
      where: { id },
      include: {
        dispositivos: {
          orderBy: { fechaInstalacion: "desc" },
          include: { evaluacion: true },
        },
        mediciones: {
          orderBy: { fecha: "desc" },
          take: 50,
          include: { dispositivo: { select: { nombre: true, tipo: true } } },
        },
        fotos: { orderBy: { fecha: "desc" }, take: 100 },
        incidencias: {
          orderBy: { fecha: "desc" },
          include: { dispositivo: { select: { nombre: true } } },
        },
      },
    });
  },
  ["testing-site-detail"],
  { revalidate: 30, tags: ["testing", "testing-sites"] }
);

export const getTestingDispositivos = unstable_cache(
  async (opts?: { siteId?: string; tipo?: string; estado?: string }) => {
    return prisma.testDispositivo.findMany({
      where: {
        ...(opts?.siteId ? { siteId: opts.siteId } : {}),
        ...(opts?.tipo ? { tipo: opts.tipo } : {}),
        ...(opts?.estado ? { estado: opts.estado } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        site: { select: { nombre: true, municipio: true } },
        evaluacion: true,
        _count: { select: { mediciones: true, incidencias: true } },
      },
    });
  },
  ["testing-dispositivos"],
  { revalidate: 60, tags: ["testing", "testing-dispositivos"] }
);

export const getTestingDispositivoDetail = unstable_cache(
  async (id: string) => {
    return prisma.testDispositivo.findUnique({
      where: { id },
      include: {
        site: { select: { id: true, nombre: true, municipio: true } },
        evaluacion: true,
        mediciones: { orderBy: { fecha: "desc" }, take: 50 },
        fotos: { orderBy: { fecha: "desc" }, take: 50 },
        incidencias: { orderBy: { fecha: "desc" } },
      },
    });
  },
  ["testing-dispositivo-detail"],
  { revalidate: 30, tags: ["testing", "testing-dispositivos"] }
);

export const getComparativa = unstable_cache(
  async () => {
    return prisma.testDispositivo.findMany({
      include: {
        evaluacion: true,
        site: { select: { nombre: true, municipio: true } },
        _count: { select: { mediciones: true, incidencias: true } },
      },
      orderBy: { createdAt: "asc" },
    });
  },
  ["testing-comparativa"],
  { revalidate: 60, tags: ["testing"] }
);

export const getCasosExito = unstable_cache(
  async () => {
    return prisma.testSite.findMany({
      where: { estado: "activo" },
      orderBy: { createdAt: "desc" },
      include: {
        fotos: { where: { tipo: "caso_exito" }, orderBy: { fecha: "desc" } },
        _count: { select: { dispositivos: true, mediciones: true } },
      },
    });
  },
  ["testing-casos-exito"],
  { revalidate: 60, tags: ["testing"] }
);
