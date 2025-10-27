/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import resend from "@/lib/resend";
import { buildWorkerEmailHTML, buildWorkerEmailText } from "@/lib/mailer";
import fs from "fs";
import path from "path";

function normalize(v: unknown): string {
  return String(v ?? "").trim();
}

function getLogoAttachment() {
  // Try an email-friendly logo first, then fall back to the site logo.
  const tryPaths = [
    "public/media/forresterfields/logo-email.png",
    "public/media/forresterfields/logo.png",
    "public/logo-email.png",
    "public/logo.png",
  ];
  for (const p of tryPaths) {
    const abs = path.join(process.cwd(), p);
    if (fs.existsSync(abs)) {
      const buf = fs.readFileSync(abs);
      const ext = abs.endsWith(".png") ? "png" : abs.endsWith(".jpg") || abs.endsWith(".jpeg") ? "jpeg" : "png";
      return {
        filename: `logo.${ext}`,
        content: buf.toString("base64"),
        contentType: `image/${ext}`,
        content_id: "fflogo",       // <img src="cid:fflogo">
        disposition: "inline",
      };
    }
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.SUPABASE_SERVICE_ROLE || "";
    if (!url || !key) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 500 }
      );
    }

    const supabase = createSupabaseClient(url, key, { auth: { persistSession: false } });

    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let raw: Record<string, unknown> = {};

    if (ct.includes("application/json")) {
      raw = (await req.json()) as Record<string, unknown>;
    } else if (
      ct.includes("multipart/form-data") ||
      ct.includes("application/x-www-form-urlencoded")
    ) {
      const fd = await req.formData();
      raw = Object.fromEntries(fd.entries());
    }

    const rolesRaw = raw.roles;
    let roles: string[] = [];

    if (Array.isArray(rolesRaw)) {
      roles = rolesRaw.map((v) => normalize(v)).filter(Boolean);
    } else if (typeof rolesRaw === "string") {
      roles = rolesRaw
        .split(/,|\s+/)
        .map((r) => normalize(r))
        .filter(Boolean);
    }

    const payload = {
      name: normalize(raw.name),
      email: normalize(raw.email),
      phone: normalize(raw.phone),
      city: normalize(raw.city),
      age: normalize(raw.age),
      availability: normalize(raw.availability),
      roles,
      references_text: normalize(raw.references_text ?? raw.references),
      experience: normalize(raw.experience),
    };

    if (!payload.name && !payload.email) {
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 });
    }

    // --- DEDUPE (2 mins) ---
    const dedupeSince = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    let dedupeMatch: { id: string } | null = null;
    if (payload.email) {
      const { data: existingByEmail, error: existingByEmailErr } = await supabase
        .from("workers")
        .select("id, created_at")
        .eq("email", payload.email)
        .gte("created_at", dedupeSince)
        .limit(1);
      if (!existingByEmailErr && existingByEmail && existingByEmail.length) {
        dedupeMatch = existingByEmail[0] as { id: string };
      }
    } else if (payload.phone || payload.name) {
      const q = supabase
        .from("workers")
        .select("id, created_at")
        .gte("created_at", dedupeSince)
        .limit(1);
      if (payload.phone) q.eq("phone", payload.phone);
      if (payload.name) q.eq("name", payload.name);
      const { data: existingByNP, error: existingByNPErr } = await q;
      if (!existingByNPErr && existingByNP && existingByNP.length) {
        dedupeMatch = existingByNP[0] as { id: string };
      }
    }
    if (dedupeMatch) {
      return NextResponse.json({ ok: true, deduped: true });
    }

    // Insert
    const { error } = await supabase.from("workers").insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        age: payload.age,
        availability: payload.availability,
        roles: payload.roles,
        references_text: payload.references_text,
        experience: payload.experience,
        status: "new",
      },
    ]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Email (Resend)
    try {
      const origin =
        req.headers.get("origin") ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://forresterfields.vercel.app";
      const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@walkperro.com>";
      const to = process.env.NOTIFY_TO_EMAIL || "forresterfieldsweddings@gmail.com";
      const rolesList = Array.isArray(payload.roles) ? payload.roles.join(", ") : String(payload.roles || "");

      const html = buildWorkerEmailHTML({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        age: payload.age,
        availability: payload.availability,
        roles: rolesList,
        references_text: payload.references_text || "",
        experience: payload.experience || "",
        siteUrl: origin,
      });

      const text = buildWorkerEmailText({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        age: payload.age,
        availability: payload.availability,
        roles: rolesList,
        references_text: payload.references_text || "",
        experience: payload.experience || "",
        siteUrl: origin,
      });

      const _logo = getLogoAttachment();

      await resend.emails.send({
        from,
        to,
        subject: "New Worker Application",
        html,
        text,
      });
    } catch (err) {
      console.warn("[workers email] notify failed", err);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
