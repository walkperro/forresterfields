const fs = require('fs');
const p = 'src/components/HeroVideo.tsx';
let s = fs.readFileSync(p, 'utf8');

// 1️⃣ Slightly zoom out the circular logo
s = s.replace(/scale-\[118%\]/, 'scale-[110%]');

// 2️⃣ Nudge the logo position upward/right
s = s.replace(/right-4 top-4 sm:right-6 sm:top-6/, 'right-5 top-2 sm:right-8 sm:top-4');

// 3️⃣ Remove gradient overlay div
s = s.replace(/<div className="pointer-events-none absolute inset-0 bg-gradient-to-b[^>]+><\/div>\s*/s, '');

fs.writeFileSync(p, s);
console.log('✅ Adjusted logo zoom/position and removed gradient overlay');
