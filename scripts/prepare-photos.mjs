// scripts/prepare-photos.mjs
// Downloads the Pexels photos used for service heroes and Insights covers, crops them
// to one size and softens their colour so they sit calmly beside the navy and gold.
//
// Run from the project root:   node scripts/prepare-photos.mjs
//
// The results in public/images/photos/ are committed, so this only needs to run again
// when the list below changes. Pexels licence: https://www.pexels.com/license/
// (free for commercial use, attribution not required).
//
// Choosing a photo: no gavels, scales or skylines, no recognisable faces (nobody should
// be mistaken for the firm's staff or clients), and no readable text on documents.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const WIDTH = 1200;
const HEIGHT = 800;

// [file name, Pexels photo id, Pexels page slug]
const PHOTOS = [
  // Services
  ["service-business-legal-retainer", 6077554, "close-up-view-of-two-people-shake-hands"],
  ["service-corporate-commercial-law", 8815849, "a-person-signing-a-contract"],
  ["service-employment-labour-law", 7964540, "a-table-with-laptop-and-documents"],
  ["service-debt-recovery", 7680744, "person-holding-oink-calculator"],
  ["service-intellectual-property", 6615229, "sketches-and-drawings-on-a-sketchpad"],
  ["service-conveyancing-real-estate", 7599735, "person-with-keys-for-real-estate"],
  ["service-civil-litigation-dispute-resolution", 6071241, "architecture-with-classical-style-columns"],
  ["service-family-law", 19878582, "silhouette-of-family-on-beach-at-sunset"],
  ["service-succession-probate", 955394, "white-paper-and-silver-fountain-pen"],
  // Insights posts
  ["post-legal-retainer", 6814523, "people-handshake"],
  ["post-choosing-an-advocate", 18298087, "a-row-of-books-on-a-shelf"],
  ["post-first-consultation", 260973, "open-book-with-person-s-hand-on-top"],
  ["post-buying-land", 8322786, "aerial-view-of-fields"],
  ["post-starting-a-company", 7594479, "laptop-notebook-office-pen"],
  ["post-wills-succession", 3030090, "photo-of-family-standing-outdoors-during-golden-hour"],
];

await mkdir("public/images/photos", { recursive: true });

for (const [name, id, slug] of PHOTOS) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`\n✖ Could not download ${name} (HTTP ${res.status}): https://www.pexels.com/photo/${slug}-${id}/\n`);
    process.exit(1);
  }
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.82 })
    .jpeg({ quality: 74, mozjpeg: true })
    .toFile(`public/images/photos/${name}.jpg`);
  console.log(`✓ ${name}.jpg  https://www.pexels.com/photo/${slug}-${id}/`);
}
