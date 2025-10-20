const fs = require('fs');
const p = 'src/components/HeroVideo.tsx';
if (!fs.existsSync(p)) {
  console.log('❌ File not found:', p);
  process.exit(1);
}
let s = fs.readFileSync(p, 'utf8');

// Look for an <Image> or <img> that points at /media/forresterfields/logo.jpg|png
const reImg = /<(?:Image|img)\b[^>]*src="\/media\/forresterfields\/logo\.(?:jpg|png)"[^>]*\/?>/;

if (!reImg.test(s)) {
  console.log('⚠️ Could not find a logo tag pointing at /media/forresterfields/logo.(jpg|png). Aborting.');
  process.exit(0);
}

// Replace with circular mask + slight zoom and tiny offset so the black ring sits on the edge
s = s.replace(
  reImg,
`<div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden">
  <img
    src="/media/forresterfields/logo.jpg"
    alt="ForresterFields"
    className="absolute inset-0 h-full w-full object-cover scale-[118%] translate-x-[1%] translate-y-[1%]"
    loading="eager"
    decoding="async"
  />
</div>`
);

fs.writeFileSync(p, s);
console.log('✅ Patched', p);
