import { prisma } from "./prisma";

export async function getTestingStats() {
  const [sitiosActivos, dispositivosInstalados, totalMediciones, incidenciasAbiertas] =
    await Promise.all([
      prisma.testSite.count({ where: { estado: "activo" } }),
      prisma.testDispositivo.count({ where: { estado: "activo" } }),
      prisma.testMedicion.count(),
      prisma.testIncidencia.count({ where: { resuelta: false } }),
    ]);
  return { sitiosActivos, dispositivosInstalados, totalMediciones, incidenciasAbiertas };
}

export async function getTestingSites(opts?: { estado?: string; municipio?: string }) {
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
}

export async function getTestingSiteDetail(id: string) {
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
      fotos: { orderBy: { fecha: "desc" } },
      incidencias: {
        orderBy: { fecha: "desc" },
        include: { dispositivo: { select: { nombre: true } } },
      },
    },
  });
}

export async function getTestingDispositivos(opts?: {
  siteId?: string;
  tipo?: string;
  estado?: string;
}) {
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
}

export async function getTestingDispositivoDetail(id: string) {
  return prisma.testDispositivo.findUnique({
    where: { id },
    include: {
      site: { select: { id: true, nombre: true, municipio: true } },
      evaluacion: true,
      mediciones: { orderBy: { fecha: "desc" }, take: 50 },
      fotos: { orderBy: { fecha: "desc" } },
      incidencias: { orderBy: { fecha: "desc" } },
    },
  });
}

export async function getComparativa() {
  return prisma.testDispositivo.findMany({
    include: {
      evaluacion: true,
      site: { select: { nombre: true, municipio: true } },
      _count: { select: { mediciones: true, incidencias: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function getCasosExito() {
  // Single query — no N+1
  return prisma.testSite.findMany({
    where: { estado: "activo" },
    orderBy: { createdAt: "desc" },
    include: {
      fotos: { where: { tipo: "caso_exito" }, orderBy: { fecha: "desc" } },
      _count: { select: { dispositivos: true, mediciones: true } },
    },
  });
}
