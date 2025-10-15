import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (!p.startsWith("/admin")) return;

  const auth = req.headers.get("authorization") || "";
  const expected = "Basic " + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString("base64");
  if (auth !== expected) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Forrester Fields Admin"' },
    });
  }
}
export const config = { matcher: ["/admin/:path*"] };
