import fs from "fs";
import path from "path";

/** Returns ordered list of /media/forresterfields/preview*.{jpg,png,webp} */
export function getPreviewImages(): string[] {
  const dir = path.join(process.cwd(), "public", "media", "forresterfields");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const keep = files.filter(f =>
    /^preview\d+\.(jpe?g|png|webp)$/i.test(f)
  );

  // natural numeric order: preview1, preview2, … preview10
  keep.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return keep.map(f => `/media/forresterfields/${f}`);
}
