import { NextResponse } from "next/server";

const INDEXNOW_KEY = "3a5cfe49a189629d8745cb3331af6659";
const BASE_URL = "https://xanael.es";
const LOCALES = ["es", "en", "fr", "it", "pt"];

const PUBLIC_PATHS = [
  "",
  "/nosotros",
  "/infraestructuras",
  "/noticias",
  "/noticias/ayuntalia-2025",
  "/noticias/municipalia-2025",
  "/noticias/expocida-2026",
  "/noticias/expocida-2026-poster",
  "/contacto",
  "/colaboradores",
  "/distribuidores",
  "/piloto",
];

function buildUrlList(): string[] {
  const urls: string[] = [];
  for (const locale of LOCALES) {
    for (const path of PUBLIC_PATHS) {
      urls.push(`${BASE_URL}/${locale}${path}`);
    }
  }
  return urls;
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.INDEXNOW_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = buildUrlList();

  const body = {
    host: "xanael.es",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "IndexNow submission failed", status: response.status },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    submitted: urls.length,
    urls,
  });
}

export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urls: buildUrlList().length,
  });
}
