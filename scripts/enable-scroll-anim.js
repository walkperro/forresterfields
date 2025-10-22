const fs = require('fs');
const f = 'src/components/GalleryGrid.tsx';
let s = fs.readFileSync(f, 'utf8');

// 1) Ensure we import LazyMotion + domAnimation alongside m
s = s.replace(
  /import\s*{\s*m\s*}\s*from\s*["']framer-motion["'];?/,
  'import { m, LazyMotion, domAnimation } from "framer-motion";'
);

// 2) Add container/item variants (once), right after imports
if (!/const\s+container\s*=/.test(s)) {
  s = s.replace(
    /(\n\s*export\s+type\s+GalleryImage[\s\S]*?;)/,
`$1

// Smooth scroll-in animation for column items
const container = {
  hidden: { opacity: 1 },
  show:   {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 }
  }
};
const item = {
  hidden: { opacity: 0, y: 14, scale: 0.995 },
  show:   {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};
`
  );
}

// 3) Make the column container a motion.div with whileInView + viewport
s = s.replace(
  /<div className="columns-2([^"]*)">/,
  '<m.div className="columns-2$1" variants={container} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}>'
).replace(
  /<\/div>\s*<\/section>/,
  '</m.div>\n      </section>'
);

// 4) Wrap each card in an inline-block wrapper with break-inside:avoid and use variants=item
s = s.replace(
  /{filtered\.map\(\(img, i\) => \{\s*const src[\s\S]*?return \(\s*<m\.button([\s\S]*?)<\/m\.button>\s*\);\s*\}\)\)}/,
  `{filtered.map((img, i) => {
            const src = toSrc(img);
            const alt = toAlt(img, i);
            return (
              <m.div
                key={src + i}
                variants={item}
                className="inline-block align-top w-full mb-3 [break-inside:avoid]"
              >
                <m.button
                  onClick={() => { setIndex(i); setOpen(true); }}
                  className="group block w-full overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 hover:ring-brand-gold"
                  aria-label={\`Open photo \${i + 1}\`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={900}
                    height={700}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    priority={i < 2}
                  />
                </m.button>
              </m.div>
            );
          })}`
);

// 5) Wrap the whole return fragment in <LazyMotion> so animations are tiny+fast
s = s.replace(
  /return\s*\(\s*<>\s*/,
  'return (\n    <LazyMotion features={domAnimation}>\n      <>'
).replace(
  /\)\s*;\s*}\s*$/,
  '      </>\n    </LazyMotion>\n  );\n}\n'
);

fs.writeFileSync(f, s, 'utf8');
console.log('✅ Scroll animation enabled for gallery items (columns-safe).');
