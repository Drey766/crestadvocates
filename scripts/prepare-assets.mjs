// scripts/prepare-assets.mjs
// Turns the two ORIGINAL images in /assets into the web-ready files the site uses.
//
//   assets/logo-original.jpg   (1080x1080 stacked logo on navy)
//   assets/owner-original.jpg  (3072x4096 portrait of Lynn Ngugi)
//
// Run once from the project root:   node scripts/prepare-assets.mjs
// Needs sharp:                      npm install --save-dev sharp
//
// The crop boxes below were tested by eye on the real files. If the client ever
// sends new originals with different dimensions, the script stops and tells you
// instead of cropping blindly.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const NAVY = "#03112C";
const LOGO = "assets/logo-original.jpg";
const OWNER = "assets/owner-original.jpg";

const EXPECT = {
  [LOGO]: { width: 1080, height: 1080 },
  [OWNER]: { width: 3072, height: 4096 },
};

// Crop boxes (left, top, width, height) in original-image pixels.
// Shield artwork measured at x371-708, y136-550; the "CREST" letters start at y575,
// so the box stops at y570 to keep the letter tops out of the crop.
const SHIELD = { left: 335, top: 116, width: 410, height: 454 };
const OWNER_SQUARE = { left: 1016, top: 1500, width: 1300, height: 1300 };

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

for (const file of [LOGO, OWNER]) {
  if (!existsSync(file)) {
    fail(
      `Missing ${file}\n  Put the original logo at ${LOGO} and the original photo of Lynn at ${OWNER}.\n  (See assets/README.md.)`
    );
  }
  const meta = await sharp(file).metadata();
  const want = EXPECT[file];
  if (meta.width !== want.width || meta.height !== want.height) {
    fail(
      `${file} is ${meta.width}x${meta.height}, but the crop boxes were measured on ${want.width}x${want.height}.\n  Use the original files, or update the crop boxes at the top of this script.`
    );
  }
}

await mkdir("public/images/team", { recursive: true });

// 1. Stacked logo (full lockup, navy background baked in) - navy sections only
await sharp(LOGO).jpeg({ quality: 90 }).toFile("public/images/logo-stacked.jpg");

// 2. Shield mark - navbar, footer watermark
await sharp(LOGO).extract(SHIELD).png().toFile("public/images/logo-shield.png");

// 3. Favicon / apple-touch source (square, shield centred on navy)
await sharp(LOGO)
  .extract(SHIELD)
  .resize(256, 256, { fit: "contain", background: NAVY })
  .png()
  .toFile("public/images/favicon-256.png");

// 4. Lynn: pre-cropped to head and shoulders. NEVER use the uncropped original,
//    the foreground shows client files and papers.
await sharp(OWNER)
  .extract(OWNER_SQUARE)
  .resize(1000, 1000)
  .jpeg({ quality: 85 })
  .toFile("public/images/team/lynn-ngugi.jpg");

// 5. Open Graph image 1200x630: logo centred on navy
const logoSized = await sharp(LOGO).resize(560, 560).jpeg({ quality: 90 }).toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: NAVY },
})
  .composite([{ input: logoSized, gravity: "centre" }])
  .jpeg({ quality: 88 })
  .toFile("public/images/og-image.jpg");

console.log("✔ Wrote:");
for (const f of [
  "public/images/logo-stacked.jpg",
  "public/images/logo-shield.png",
  "public/images/favicon-256.png",
  "public/images/team/lynn-ngugi.jpg",
  "public/images/og-image.jpg",
]) {
  const m = await sharp(f).metadata();
  console.log(`  ${f}  (${m.width}x${m.height})`);
}
