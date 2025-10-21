const fs = require("fs");
const file = "src/app/page.tsx";
let s = fs.readFileSync(file, "utf8");

// 1) Ensure Image import exists
if (!/from\s+["']next\/image["']/.test(s))
  s = s.replace(/^(import .*\n)+/, (m) => m + 'import Image from "next/image";\n');

// 2) Replace any <img ...logo...> with proper <Image/>
s = s.replace(
  /<img[^>]*src=["'][^"']*logo[^"']*["'][^>]*>/i,
  `<Image
    src="/media/forresterfields/logo.jpg"
    alt="Forrester Fields logo"
    width={224}
    height={224}
    className="w-56 h-auto object-contain"
  />`
);

fs.writeFileSync(file, s, "utf8");
console.log("✅ Fixed logo image in src/app/page.tsx");
