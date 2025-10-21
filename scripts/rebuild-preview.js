const fs = require('fs');
const p = 'public/media/forresterfields';
const files = fs.readdirSync(p).filter(f =>
  /\.(jpe?g|png|webp|avif)$/i.test(f)
).sort((a,b)=>a.localeCompare(b, undefined, {numeric:true}));

// prefer large-ish images: simple heuristic
const pick = (arr, n) => arr.slice(0, n);

let chosen = pick(files, 8);
const idx3 = files.findIndex(f => /-3\.(jpe?g|png|webp|avif)$/i.test(f));
if (idx3 !== -1) {
  // force the 3rd slot (index 2) to be the "-3" file
  const target = files[idx3];
  if (!chosen.includes(target)) chosen[2] = target;
  else {
    // if it is already included but not at position 2, swap in
    const cur = chosen.indexOf(target);
    const tmp = chosen[2]; chosen[2] = chosen[cur]; chosen[cur] = tmp;
  }
}

const paths = chosen.map(f => `"/media/forresterfields/${f}"`).join(',\n  ');
const patch = `  const PREVIEW = [\n  ${paths}\n];`;

let s = fs.readFileSync('src/app/page.tsx','utf8');
s = s.replace(/const PREVIEW\s*=\s*\[[\s\S]*?\];/, patch);
fs.writeFileSync('src/app/page.tsx', s, 'utf8');

console.log('✅ PREVIEW updated to:\n', patch);
