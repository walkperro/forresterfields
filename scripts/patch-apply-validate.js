const fs = require("fs");
const f = "src/app/event-pool/ApplyFormClient.tsx";
if (!fs.existsSync(f)) {
  console.error("❌ Not found:", f);
  process.exit(1);
}
let s = fs.readFileSync(f, "utf8");

/* Ensure we have useRef/useEffect imported */
if (/from\s+"react"/.test(s)) {
  s = s.replace(/import\s+\{\s*([^}]+)\}\s+from\s+"react";?/,
    (m, names) => {
      const set = new Set(names.split(",").map(n => n.trim()).filter(Boolean));
      set.add("useRef");
      set.add("useEffect");
      return `import { ${Array.from(set).join(", ")} } from "react";`;
    }
  ).replace(/import\s+React\s+from\s+"react";?/, (m) => {
    if (!/import\s+\{[^}]*\}\s+from\s+"react"/.test(s)) {
      return `${m}\nimport { useRef, useEffect } from "react";`;
    }
    return m;
  });
} else if (/import\s+React\s+from\s+"react";?/.test(s)) {
  s = s.replace(/import\s+React\s+from\s+"react";?/, (m) => `${m}\nimport { useRef, useEffect } from "react";`);
}

/* Add ref/id/noValidate/onSubmit to first <form ...> */
s = s.replace(/<form([^>]*)>/, (m, attrs) => {
  let a = attrs || "";
  const addAttr = (name, value = null) => {
    const re = new RegExp(`\\s${name}(=|\\s|>)`);
    if (!re.test(a)) a += value === null ? ` ${name}` : ` ${name}="${value}"`;
  };
  addAttr("id", "apply-form");
  addAttr("noValidate");
  addAttr("ref", "{formRef}");
  addAttr("onSubmit", "{handleSubmit}");
  return `<form${a}>`;
});

/* Inject validation helpers after: export default function ... { */
const compStartRe = /export\s+default\s+function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{/;
if (!compStartRe.test(s)) {
  console.error("❌ Could not find component start: `export default function ...`");
  process.exit(1);
}
s = s.replace(compStartRe, (m) => {
  return m + `
  const formRef = useRef<HTMLFormElement | null>(null);

  // Update these selectors to match your input/select/textarea name= values
  const requiredSelectors = [
    "input[name=\\"name\\"]",
    "input[name=\\"email\\"]",
    "input[name=\\"phone\\"]",
    "input[name=\\"city\\"]",
    "input[name=\\"age\\"]",
    "select[name=\\"availability\\"]",
    // If roles is a checkbox group, you can change this later to a group rule.
    "input[name=\\"roles\\"]",
    "textarea[name=\\"experience\\"]",
    "textarea[name=\\"references_text\\"]"
  ];

  function isFilled(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    if (el instanceof HTMLInputElement) {
      if (el.type === "checkbox" || el.type === "radio") return el.checked;
      return el.value.trim().length > 0;
    }
    if (el instanceof HTMLTextAreaElement) return el.value.trim().length > 0;
    if (el instanceof HTMLSelectElement) return !!el.value;
    return true;
  }

  function mark(el: Element, bad: boolean) {
    if (!(el instanceof HTMLElement)) return;
    const on = ["ring-2","ring-red-400","border-red-500","focus:ring-red-400"];
    if (bad) on.forEach(c => el.classList.add(c));
    else on.forEach(c => el.classList.remove(c));
    el.setAttribute("aria-invalid", bad ? "true" : "false");
  }

  function validateForm(root: HTMLElement) {
    const missing: HTMLElement[] = [];
    requiredSelectors.forEach(sel => {
      const el = root.querySelector(sel) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null);
      if (!el) return;
      const ok = isFilled(el);
      mark(el, !ok);
      if (!ok) missing.push(el as HTMLElement);
      const clear = () => mark(el, !isFilled(el));
      el.addEventListener("input", clear, { once: true });
      el.addEventListener("change", clear, { once: true });
    });
    return missing;
  }

  function handleSubmit(e: React.FormEvent) {
    const form = formRef.current;
    if (!form) return;
    const missing = validateForm(form);
    if (missing.length) {
      e.preventDefault();
      missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
      (missing[0] as HTMLElement).focus?.();
      alert("Please fill in all required fields before submitting.");
    }
  }
`;
});

/* Backup then write */
fs.writeFileSync(f + ".bak", fs.readFileSync(f, "utf8"));
fs.writeFileSync(f, s);
console.log("✓ Applied client-side validation to", f);
