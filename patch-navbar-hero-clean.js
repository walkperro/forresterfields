const fs = require("fs");

function patchNavbar() {
  const p = "src/components/Navbar.tsx";
  if (!fs.existsSync(p)) { console.error("Missing:", p); process.exit(1); }
  let s = fs.readFileSync(p, "utf8");

  // Replace whatever <Image ... /> tag is used for the home link logo
  const imgRE = /<Image\s+[^>]*\/>/m;
  const newImg = `<Image
            src="/media/forresterfields/ffieldslogotransparent.jpg"
            alt="Forrester Fields"
            width={150}
            height={40}
            priority
            className="h-10 w-auto"
          />`;

  if (imgRE.test(s)) {
    s = s.replace(imgRE, newImg);
  } else {
    console.warn("Could not find <Image .../> in Navbar to replace.");
  }
  fs.writeFileSync(p, s);
  console.log("✅ Patched Navbar logo -> ffieldslogotransparent.jpg");
}

function patchHero() {
  const p = "src/components/HeroVideo.tsx";
  if (!fs.existsSync(p)) { console.error("Missing:", p); process.exit(1); }
  let s = fs.readFileSync(p, "utf8");

  // 1) Remove next/image import if present
  s = s.replace(/^\s*import\s+Image\s+from\s+"next\/image";\s*\n/m, "");

  // 2) Remove gradient overlay line (self-closing div)
  s = s.replace(/\s*<div className="pointer-events-none absolute inset-0[^"]*"\s*\/>\s*\n?/, "");

  // 3) Remove the logo badge block — from the "Logo badge" comment up to before "Text overlay"
  const badgeBlockRE = /\{\s*\/\*\s*Logo badge[^]*?\*\/\s*\}[^]*?(?=\{\s*\/\*\s*Text overlay)/m;
  if (badgeBlockRE.test(s)) {
    s = s.replace(badgeBlockRE, "");
  } else {
    // fallback: try a looser match for the absolute right-7 block
    s = s.replace(/\s*<div className="pointer-events-none absolute right-[\s\S]*?<\/div>\s*\n/, "");
  }

  fs.writeFileSync(p, s);
  console.log("✅ Removed hero gradient + logo overlay");
}

patchNavbar();
patchHero();
