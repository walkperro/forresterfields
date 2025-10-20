const fs = require('fs');
const p = 'src/components/HeroVideo.tsx';
let s = fs.readFileSync(p, 'utf8');

// 1️⃣ Zoom out slightly more
s = s.replace(/scale-\[\d+%]/, 'scale-[105%]');

// 2️⃣ Move logo higher/right
s = s.replace(/right-\d+ top-\d+ sm:right-\d+ sm:top-\d+/, 'right-7 top-1 sm:right-10 sm:top-2');

// 3️⃣ Remove any remaining gradient overlay div
s = s.replace(/<div className="pointer-events-none absolute inset-0 bg-[^>]+><\/div>\s*/gs, '');
s = s.replace(/bg-gradient-to-b[^"]*/g, ''); // catches partial gradients

fs.writeFileSync(p, s);
console.log('✅ Final hero logo adjustment: smaller zoom, higher/right placement, no gradient.');
