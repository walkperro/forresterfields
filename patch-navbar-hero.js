const fs = require("fs");

// ---------- 1️⃣ Navbar logo swap ----------
const navbar = "src/components/Navbar.tsx";
if (fs.existsSync(navbar)) {
  let s = fs.readFileSync(navbar, "utf8");

  // Replace logo text or svg with transparent PNG
  s = s.replace(
    /<Link href="\/"[^>]*>[\s\S]*?<\/Link>/,
    `<Link href="/" className="flex items-center">
      <img
        src="/media/forresterfields/ffieldslogotransparent.png"
        alt="Forrester Fields Logo"
        className="h-10 sm:h-12 w-auto object-contain"
        loading="eager"
        decoding="async"
      />
    </Link>`
  );

  fs.writeFileSync(navbar, s);
  console.log("✅ Navbar updated to use transparent PNG logo");
} else {
  console.warn("⚠️ Navbar.tsx not found, skipping logo swap");
}

// ---------- 2️⃣ Hero cleanup ----------
const hero = "src/components/HeroVideo.tsx";
if (fs.existsSync(hero)) {
  let s = fs.readFileSync(hero, "utf8");

  // Remove dark gradient overlay div
  s = s.replace(/<div className="pointer-events-none absolute inset-0 bg-gradient-to-b[^>]+><\/div>/g, "");

  // Remove previously injected logo overlay (if exists)
  s = s.replace(/<div className="pointer-events-none absolute [^>]+?<\/div>\s*/gs, "");

  fs.writeFileSync(hero, s);
  console.log("✅ HeroVideo cleaned: gradient + logo overlay removed");
} else {
  console.warn("⚠️ HeroVideo.tsx not found, skipping cleanup");
}
