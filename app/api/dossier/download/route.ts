import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") === "en" ? "en" : "es";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const country = req.headers.get("x-vercel-ip-country") ?? null;

  await prisma.dossierDownload.create({
    data: { ip, country, locale: lang },
  });

  revalidateTag("dossier-stats");

  const file =
    lang === "en" ? "/docs/dossier-xanael-en.pdf" : "/docs/dossier-xanael-es.pdf";

  return NextResponse.redirect(new URL(file, req.url));
}
