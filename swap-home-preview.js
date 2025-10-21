const fs = require('fs');

const file = 'src/app/page.tsx';
let src = fs.readFileSync(file, 'utf8');

// grab the PREVIEW block
const blockRe = /const\s+PREVIEW\s*=\s*\[(.*?)\];/s;
const m = src.match(blockRe);
if (!m) throw new Error('PREVIEW array not found in src/app/page.tsx');

const block = m[1];
// collect all quoted paths inside the block
const items = [...block.matchAll(/"([^"]+)"/g)].map(x => x[1]);

// swap 6th and 8th (1-based) => indexes 5 and 7
const i6 = 5, i8 = 7;
if (items[i6] == null || items[i8] == null) {
  throw new Error('PREVIEW needs at least 8 items to swap #6 and #8');
}
[items[i6], items[i8]] = [items[i8], items[i6]];

// rebuild the block, preserving a clean pretty format
const rebuilt =
  'const PREVIEW = [\n  ' + items.map(s => `"${s}"`).join(',\n  ') + '\n];';

src = src.replace(blockRe, rebuilt);
fs.writeFileSync(file, src, 'utf8');

console.log('✅ Swapped home PREVIEW images #6 and #8.\n');
console.log(items.map((s, i) => `${i + 1}. ${s}`).join('\n'));
