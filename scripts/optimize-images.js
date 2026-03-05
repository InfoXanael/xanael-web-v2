const sharp = require("sharp");
const path = require("path");

const input = path.join(__dirname, "../public/images/hero-banner.png");
const output = path.join(__dirname, "../public/images/hero-banner.webp");

sharp(input)
  .webp({ quality: 85 })
  .toFile(output)
  .then((info) => {
    console.log("hero-banner.webp created:", Math.round(info.size / 1024) + "KB");
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
