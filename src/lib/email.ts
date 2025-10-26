import resend from "./resend";
import { buildWorkerEmailHTML, buildWorkerEmailText } from "./mailer";

export type WorkerPayload = {
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

function toRolesString(v: unknown): string {
  if (Array.isArray(v)) return (v as unknown[]).map(String).filter(Boolean).join(", ");
  if (typeof v === "string") {
    return v.split(/,|\s+/).map(s => s.trim()).filter(Boolean).join(", ");
  }
  return "";
}

export async function sendWorkerApplicationEmail(to: string, payload: WorkerPayload) {
  const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@walkperro.com>";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://forresterfields.vercel.app";

  const roles = toRolesString(payload.roles);

  const html = buildWorkerEmailHTML({
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    phone: String(payload.phone ?? ""),
    city: String(payload.city ?? ""),
    age: String(payload.age ?? ""),
    availability: String(payload.availability ?? ""),
    roles,
    references_text: String(payload.references_text ?? ""),
    experience: String(payload.experience ?? ""),
    siteUrl,
  });

  const text = buildWorkerEmailText({
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    phone: String(payload.phone ?? ""),
    city: String(payload.city ?? ""),
    age: String(payload.age ?? ""),
    availability: String(payload.availability ?? ""),
    roles,
    references_text: String(payload.references_text ?? ""),
    experience: String(payload.experience ?? ""),
    siteUrl,
  });

  await resend.emails.send({
    from,
    to,
    subject: "New Worker Application",
    html,
    text,
  });
}
