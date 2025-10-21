const fs = require("fs");
const f = "src/components/GalleryGrid.tsx";
let s = fs.readFileSync(f, "utf8");

// make sure Image import exists
if (!/from\s+["']next\/image["']/.test(s))
  s = s.replace(/^(import .*\n)+/, (m) => m + 'import Image from "next/image";\n');

// add sizes/priority/loading if not already there
s = s.replace(
  /<Image([^>]*?)>/g,
  `<Image$1
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading={i < 4 ? 'eager' : 'lazy'}
    priority={i < 2}
  >`
);

fs.writeFileSync(f, s, "utf8");
console.log("✅ Optimized Image tags in GalleryGrid.tsx");
