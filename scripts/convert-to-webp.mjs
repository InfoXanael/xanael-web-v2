import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const PUBLIC_DIR = "public";
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function findImages(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findImages(full)));
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

async function convert(filePath) {
  const ext = extname(filePath);
  const webpPath = filePath.slice(0, -ext.length) + ".webp";
  await sharp(filePath).webp({ quality: 85 }).toFile(webpPath);
  await unlink(filePath);
  console.log(`✓ ${basename(filePath)} → ${basename(webpPath)}`);
}

const images = await findImages(PUBLIC_DIR);
if (images.length === 0) {
  console.log("No images to convert.");
} else {
  console.log(`Found ${images.length} images to convert.\n`);
  for (const img of images) {
    await convert(img);
  }
  console.log(`\nDone. Converted ${images.length} images.`);
}
