type WorkerPayload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  age?: string;
  availability?: string;
  roles?: string[] | string;
  references_text?: string;
  experience?: string;
};

function toArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string") {
    return v.split(/,|\s+/).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

function buildMessage(p: WorkerPayload) {
  const roles = toArray(p.roles).join(", ");
  const lines = [
    `A new worker application was submitted:`,
    ``,
    `Name: ${p.name ?? ""}`,
    `Email: ${p.email ?? ""}`,
    `Phone: ${p.phone ?? ""}`,
    `City: ${p.city ?? ""}`,
    `Age: ${p.age ?? ""}`,
    `Availability: ${p.availability ?? ""}`,
    `Roles: ${roles}`,
    ``,
    `References:`,
    `${p.references_text ?? ""}`,
    ``,
    `Experience:`,
    `${p.experience ?? ""}`,
  ];
  const text = lines.join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px">New Worker Application</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 8px"><b>Name</b></td><td>${p.name ?? ""}</td></tr>
        <tr><td style="padding:4px 8px"><b>Email</b></td><td>${p.email ?? ""}</td></tr>
        <tr><td style="padding:4px 8px"><b>Phone</b></td><td>${p.phone ?? ""}</td></tr>
        <tr><td style="padding:4px 8px"><b>City</b></td><td>${p.city ?? ""}</td></tr>
        <tr><td style="padding:4px 8px"><b>Age</b></td><td>${p.age ?? ""}</td></tr>
        <tr><td style="padding:4px 8px"><b>Availability</b></td><td>${p.availability ?? ""}</td></tr>
        <tr><td style="padding:4px 8px"><b>Roles</b></td><td>${roles}</td></tr>
      </table>
      <p><b>References</b><br>${(p.references_text ?? "").replace(/\n/g,"<br>")}</p>
      <p><b>Experience</b><br>${(p.experience ?? "").replace(/\n/g,"<br>")}</p>
    </div>
  `;
  return { text, html };
}

export async function sendWorkerApplicationEmail(to: string, payload: WorkerPayload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY missing; skipping email");
    return;
  }
  const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <no-reply@forresterfields.app>";
  const subject = "New Worker Application";
  const { text, html } = buildMessage(payload);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, text }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    console.warn("[email] Resend error:", res.status, msg);
  }
}
