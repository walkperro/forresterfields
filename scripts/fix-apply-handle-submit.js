const fs = require("fs");
const f = "src/app/event-pool/ApplyFormClient.tsx";
if (!fs.existsSync(f)) { console.error("❌ Not found", f); process.exit(1); }
let s = fs.readFileSync(f, "utf8");

/** 1) Ensure useRouter import */
if (!/from\s+"next\/navigation"/.test(s)) {
  s = `import { useRouter } from "next/navigation";\n` + s;
} else if (!/useRouter/.test(s)) {
  s = s.replace(/from\s+"next\/navigation";?/, 'from "next/navigation";');
  s = s.replace(/import\s*\{\s*([^}]+)\}\s*from\s*"next\/navigation";?/, (m, names) => {
    const set = new Set(names.split(",").map(n => n.trim()).filter(Boolean));
    set.add("useRouter");
    return `import { ${Array.from(set).join(", ")} } from "next/navigation";`;
  });
}

/** 2) Ensure router is initialized inside component */
s = s.replace(
  /export\s+default\s+function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{/,
  (m) => m + `\n  const router = useRouter();`
);

/** 3) Replace the ENTIRE handleSubmit function body with a correct version */
const findFunction = () => {
  const start = s.indexOf("function handleSubmit");
  if (start < 0) return null;
  const braceStart = s.indexOf("{", start);
  if (braceStart < 0) return null;
  let i = braceStart, depth = 0;
  while (i < s.length) {
    const ch = s[i++];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return { start, braceStart, end: i }; // end is index AFTER the closing }
    }
  }
  return null;
};

const loc = findFunction();
if (!loc) {
  console.error("❌ Couldn’t locate handleSubmit() to replace.");
  process.exit(1);
}

const newHandle = `
function handleSubmit(e: React.FormEvent) {
  const form = formRef.current;
  if (!form) return;

  const missing = validateForm(form);
  if (missing.length) {
    e.preventDefault();
    missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
    (missing[0] as HTMLElement).focus?.();
    alert("Please fill in all required fields before submitting.");
    return;
  }

  // Submit via fetch to preserve SPA feel, then redirect to thanks.
  e.preventDefault();
  const data = new FormData(form);
  const action = form.getAttribute("action") || window.location.pathname;
  const method = (form.getAttribute("method") || "POST").toUpperCase();

  fetch(action, { method, body: data })
    .then((res) => {
      if (!res.ok) throw new Error(String(res.status));
      router.push("/event-pool/thanks");
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
}
`.trim();

const before = s.slice(0, loc.start);
const after = s.slice(loc.end);
s = before + newHandle + after;

/** 4) Make sure the form uses our handler and ref (id/noValidate/ref/onSubmit) */
s = s.replace(/<form([^>]*)>/, (m, attrs) => {
  let a = attrs || "";
  const add = (name, val = null) => {
    const re = new RegExp(`\\s${name}(\\s|=|>)`);
    if (!re.test(a)) a += val === null ? ` ${name}` : ` ${name}="${val}"`;
  };
  add("id", "apply-form");
  add("noValidate");
  add("ref", "{formRef}");
  add("onSubmit", "{handleSubmit}");
  return `<form${a}>`;
});

fs.writeFileSync(f + ".bak_handle_submit", fs.readFileSync(f, "utf8"));
fs.writeFileSync(f, s);
console.log("✓ Replaced handleSubmit with a well-braced version and wired redirect");
