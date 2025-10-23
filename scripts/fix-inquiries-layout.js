const fs = require("fs");
const f = "src/app/admin/inquiries/page.tsx";

if (!fs.existsSync(f)) {
  console.error("❌ File not found:", f);
  process.exit(1);
}

let s = fs.readFileSync(f, "utf8");
let orig = s;

// Ensure these imports exist (non-destructive)
function ensureImport(code, what, from) {
  const re = new RegExp(`import\\s+${what.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\s+from\\s+["']${from.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["']\\s*;?\\s*`);
  if (!re.test(code)) {
    code = `import ${what} from "${from}";\n` + code;
  }
  return code;
}
function ensureSideImport(code, from) {
  const re = new RegExp(`import\\s+["']${from.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["']\\s*;?\\s*`);
  if (!re.test(code)) {
    code = `import "${from}";\n` + code;
  }
  return code;
}

// add admin base/css + AdminNav (only if missing)
s = ensureSideImport(s, "../admin.css");
s = ensureSideImport(s, "../admin-ui.css");
s = ensureImport(s, "AdminNav", "@/components/AdminNav");

// Normalize the outer container to match requests page
// Replace first <div|main className="...max-w..."> with our standard wrapper
s = s.replace(/<(div|main)\s+className="[^"]*max-w-[^"]*"/, '<div className="max-w-5xl mx-auto px-4 py-10"');

// If the wrapper above wasn't present, try common "container" pattern
if (!/max-w-5xl mx-auto px-4 py-10/.test(s)) {
  s = s.replace(/<(div|main)\s+className="[^"]*container[^"]*"/, '<div className="max-w-5xl mx-auto px-4 py-10"');
}

// Standardize the H1 block like requests page
const desiredH1 = `<h1 className="font-['Playfair_Display'] text-[2rem] font-light tracking-tight text-slate-800"><span className="block mb-6">Inquiries</span></h1>`;
if (/<h1[\s\S]*?<\/h1>/.test(s)) {
  s = s.replace(/<h1[\s\S]*?<\/h1>/, desiredH1);
} else {
  // If no H1 found, insert one after the first wrapper div opening
  s = s.replace(/(<div className="max-w-5xl mx-auto px-4 py-10">)/, `$1\n      ${desiredH1}`);
}

// Ensure AdminNav is present and highlights "inquiries"
if (/<AdminNav\b/.test(s)) {
  // Replace active="..." to active="inquiries"
  s = s.replace(/<AdminNav\b([^>]*?)active="[^"]*"/, '<AdminNav$1active="inquiries"');
  // If active prop missing entirely, add it
  s = s.replace(/<AdminNav(?![^>]*active=)/, '<AdminNav active="inquiries"');
} else {
  // Insert under the H1
  s = s.replace(desiredH1, `${desiredH1}\n      <AdminNav active="inquiries" />`);
}

// Light type-only cast cleanup used by CSV (in case you cast like the requests page)
s = s.replace(/as any/g, "as unknown as Record<string, unknown>[]");

// Write only if changed
if (s !== orig) {
  fs.writeFileSync(f, s);
  console.log("✔ Inquiries page normalized: imports, wrapper, H1, AdminNav.");
} else {
  console.log("ℹ Inquiries page already normalized (no changes made).");
}
