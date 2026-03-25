/**
 * Converts non-WebP images in /public to WebP format.
 * Originals are kept as-is (they become the backup).
 * Skips: favicon files, .ico, .svg, already-webp files.
 * Skips: uploads/ (dynamic content referenced by DB).
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SKIP_DIRS = ["favicon", "uploads"];
const SKIP_EXTS = [".ico", ".svg", ".webmanifest", ".webp", ".txt", ".xml"];

function getAllImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      results.push(...getAllImages(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!SKIP_EXTS.includes(ext) && [".jpg", ".jpeg", ".png"].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function convert(filePath) {
  const dir = path.dirname(filePath);
  const name = path.basename(filePath, path.extname(filePath));
  const destPath = path.join(dir, name + ".webp");

  if (fs.existsSync(destPath)) {
    const srcSize = fs.statSync(filePath).size;
    const destSize = fs.statSync(destPath).size;
    console.log(`  SKIP (webp exists): ${path.relative(PUBLIC_DIR, filePath)} → ${path.relative(PUBLIC_DIR, destPath)} (${(destSize/1024).toFixed(0)}KB vs src ${(srcSize/1024).toFixed(0)}KB)`);
    return;
  }

  const srcSize = fs.statSync(filePath).size;
  await sharp(filePath)
    .webp({ quality: 85 })
    .toFile(destPath);
  const destSize = fs.statSync(destPath).size;
  const savings = ((srcSize - destSize) / 1024).toFixed(0);
  console.log(`  CONVERTED: ${path.relative(PUBLIC_DIR, filePath)} → ${path.relative(PUBLIC_DIR, destPath)} (saved ${savings}KB)`);
}

async function main() {
  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} non-WebP image(s) to process:\n`);
  for (const img of images) {
    await convert(img);
  }
  console.log("\nDone. Originals kept as backup.");
}

main().catch(console.error);
