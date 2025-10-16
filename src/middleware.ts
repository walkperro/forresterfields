import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER || "";
  const pass = process.env.ADMIN_PASS || "";

  // If not set, allow access (so local dev won’t block you)
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="ForresterFields Admin"' },
    });
  }

  const [inUser, inPass] = Buffer.from(encoded, "base64").toString().split(":");
  if (inUser === user && inPass === pass) return NextResponse.next();

  return new NextResponse("Forbidden", { status: 403 });
}
