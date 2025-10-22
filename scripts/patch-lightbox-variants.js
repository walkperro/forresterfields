const fs = require('fs');
const f = 'src/components/Lightbox.tsx';
let s = fs.readFileSync(f, 'utf8');

// Ensure Variants type import exists (added as a type-only import to avoid bundling)
if (!/import type\s*\{\s*Variants\s*\}\s*from\s*["']framer-motion["']/.test(s)) {
  s = s.replace(
    /from\s+["']framer-motion["'];?/,
    'from "framer-motion";\nimport type { Variants } from "framer-motion";'
  );
}

// Replace the fadeSlide block with a type-safe version
s = s.replace(
  /const\s+fadeSlide\s*=\s*\{[\s\S]*?\};\s*/m,
  `const easeCubic: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeSlide: Variants = {
  initial: { opacity: 0, x: 40 },
  enter:   { opacity: 1, x: 0, transition: { duration: 0.32, ease: easeCubic } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.26, ease: easeCubic } },
} as const;
`
);

fs.writeFileSync(f, s, 'utf8');
console.log('✅ Patched Lightbox variants (type-safe framer-motion transitions).');
