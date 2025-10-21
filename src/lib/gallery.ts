// src/lib/gallery.ts
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const GALLERY_DIR = path.join(PUBLIC_DIR, "media", "forresterfields");

const EXCLUDE = new Set(["momndad.jpg","momndad.jpeg","logo.jpg","logo.jpeg","logo.png"]);
const IMAGE_EXT = new Set([".jpg",".jpeg",".png",".webp"]);

export type GalleryImage = { src: string; alt: string };

export function getGalleryImages(): GalleryImage[] {
  const list: GalleryImage[] = [];
  if (!fs.existsSync(GALLERY_DIR)) return list;
  const files = fs.readdirSync(GALLERY_DIR);
  const seen = new Set<string>();
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    if (EXCLUDE.has(base) || base.includes("logo")) continue;
    const key = base.replace(/\s+/g, "");
    if (seen.has(key)) continue;
    seen.add(key);
    list.push({
      src: `/media/forresterfields/${file}`,
      alt: `Forrester Fields photo ${list.length + 1}`,
    });
  }
  list.sort((a,b)=>a.src.localeCompare(b.src,undefined,{numeric:true}));
  return list;
}
