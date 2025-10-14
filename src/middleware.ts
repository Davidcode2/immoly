import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_DOMAINS = [
  "https://localhost:8080",
  "http://localhost:8080",
  // Add more customer domains here
];

function generateNonce() {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

export function middleware(request: NextRequest) {
  const isEmbedRoute = request.nextUrl.pathname.startsWith("/embed");

  if (isEmbedRoute) {
    const nonce = generateNonce();
    const cspHeader = createCspHeader(nonce);

    const response = NextResponse.next();

    // Set the CSP header
    response.headers.set("Content-Security-Policy", cspHeader);

    // Pass the nonce to the application via a custom header
    // Next.js will read this custom header to inject the nonce into its script tags.
    response.headers.set("X-Nonce", nonce);

    // As a backup, you should also ensure X-Frame-Options is NOT set to DENY
    // (If you don't set it, modern browsers prioritize CSP)
    response.headers.delete("X-Frame-Options");

    return response;
  }

  return NextResponse.next();
}

// Optionally define the paths to run the middleware on
export const config = {
  matcher: "/embed/:path*", // Match only the embed-specific routes
};

const createCspHeader = (nonce: string) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const evalSource = isDevelopment ? "'unsafe-eval'" : "";
  const frameAncestors = ALLOWED_DOMAINS.join(" ");
  const cspHeader = `
      frame-ancestors 'self' ${frameAncestors};
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${evalSource};
      style-src 'self' 'unsafe-inline';
      object-src 'none';
      base-uri 'self';
    `
    .replace(/\s{2,}/g, " ")
    .trim();

  return cspHeader;
};
