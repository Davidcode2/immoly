import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_DOMAINS = [
  "https://localhost:8080",
  "http://localhost:8080",
];

export function middleware(request: NextRequest) {
  const isEmbedRoute = request.nextUrl.pathname.startsWith("/embed");

  if (isEmbedRoute) {
    const nonce = generateNonce();
    const cspHeader = createCspHeader(nonce);

    const response = NextResponse.next();

    response.headers.set("Content-Security-Policy", cspHeader);
    response.headers.set("X-Nonce", nonce);
    response.headers.delete("X-Frame-Options");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/embed/:path*", 
};

const createCspHeader = (nonce: string) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const evalSource = isDevelopment ? "'unsafe-eval'" : "";
  const frameAncestors = ALLOWED_DOMAINS.join(" ");

  const createCspHeader = (nonce: string) =>
    `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${evalSource};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self' ${frameAncestors};
`
      .replace(/\s{2,}/g, " ")
      .trim();

  return createCspHeader(nonce);
};

function generateNonce() {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}
