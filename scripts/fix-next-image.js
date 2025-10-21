const fs = require('fs');
const file = 'src/app/page.tsx';
let src = fs.readFileSync(file, 'utf8');

// Ensure next/image import exists (prepend if missing)
if (!/from\s+['"]next\/image['"]/.test(src)) {
  src = 'import Image from "next/image";\n' + src;
}

// Replace the logo <img ...logo.jpg...> with <Image .../>
const reImg = /<img[^>]*src=["']\/media\/forresterfields\/logo\.jpg["'][^>]*>/i;
src = src.replace(
  reImg,
  '<Image src="/media/forresterfields/logo.jpg" alt="Forrester Fields logo" width={224} height={224} className="w-56 h-auto object-contain" />'
);

fs.writeFileSync(file, src, 'utf8');
console.log('✅ Replaced <img> with <Image> in', file);
