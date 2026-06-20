import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "public/icon-logo-removebg-preview.png");
const appDir = path.join(root, "src/app");

/** Crop to a square around the mark, then scale edge-to-edge for max tab visibility. */
async function toSquareMark(input) {
  const trimmed = await sharp(input).trim({ threshold: 18 }).png().toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  const side = Math.min(width, height);

  return sharp(trimmed)
    .extract({
      left: 0,
      top: Math.max(0, Math.floor((height - side) / 2)),
      width: side,
      height: side,
    })
    .png()
    .toBuffer();
}

async function renderIcon(mark, size, { padded = true } = {}) {
  const logo = await sharp(mark).resize(size, size, { fit: "fill" }).png().toBuffer();

  if (!padded) return logo;

  // Light tile helps the mark read on dark browser chrome.
  const inset = Math.max(1, Math.round(size * 0.06));
  const inner = size - inset * 2;
  const innerLogo = await sharp(mark).resize(inner, inner, { fit: "fill" }).png().toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 246, g: 246, b: 243, alpha: 255 },
    },
  })
    .composite([{ input: innerLogo, gravity: "center" }])
    .png()
    .toBuffer();
}

const mark = await toSquareMark(src);

fs.writeFileSync(path.join(appDir, "icon.png"), await renderIcon(mark, 512));
fs.writeFileSync(path.join(appDir, "apple-icon.png"), await renderIcon(mark, 180));

const icoSizes = [16, 24, 32, 48, 64];
const icoParts = await Promise.all(
  icoSizes.map((size) => renderIcon(mark, size, { padded: size >= 24 })),
);
fs.writeFileSync(path.join(appDir, "favicon.ico"), await pngToIco(icoParts));

console.log("Favicons regenerated:", icoSizes.map((s) => `${s}px`).join(", "));
