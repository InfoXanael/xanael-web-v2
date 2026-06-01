const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function uploadToVPS(file: File, subfolder = "piloto"): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Tipo no permitido: ${file.name}`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Archivo demasiado grande: ${file.name}`);
  }

  const uploadUrl = process.env.VPS_UPLOAD_URL;
  const apiKey = process.env.VPS_UPLOAD_API_KEY;
  if (!uploadUrl || !apiKey) {
    throw new Error("VPS_UPLOAD_URL o VPS_UPLOAD_API_KEY no configuradas");
  }

  const body = new FormData();
  body.append("file", file);

  const res = await fetch(`${uploadUrl}/${subfolder}`, {
    method: "POST",
    headers: { "x-api-key": apiKey },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error subiendo al VPS (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { url: string };
  return data.url;
}

export async function uploadFilesToVPS(files: File[], subfolder = "piloto"): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    urls.push(await uploadToVPS(file, subfolder));
  }
  return urls;
}
