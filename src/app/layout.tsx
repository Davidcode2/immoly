import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immoly - Immobilienfinanzierung",
  description:
    "Interaktiver Tilgungsrechner der mehr kann. Berechne Deine Finanzierungsmöglichkeiten mit Sondertilgungen und Tilgungswechseln in Echtzeit. Keine Registrierung, Keine Cookies, Keine Datensammlung.",
  keywords: [
    "Immobilienfinanzierung",
    "Hauskredit",
    "Tilgungsrechner",
    "Zinsrechner",
    "Immobilien",
    "Baufinanzierung",
    "Tilgungstabelle",
  ],
  authors: [{ name: "Jakob Lingel" }],
  creator: "Jakob Lingel",
  publisher: "Immoly",
  metadataBase: new URL("https://immoly.io"),
  alternates: {
    canonical: "https://immoly.io",
  },
  openGraph: {
    title: "Immoly – Dein smarter Immobilienfinanzierungsrechner",
    description:
      "Berechne Deine Immobilienfinanzierung mit Immoly. Erhalte Tilgungstabellen und Visualisierungen in Sekunden.",
    url: "https://immoly.io",
    siteName: "Immoly",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Immoly Immobilienfinanzierung – Screenshot",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/images/favicons/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/images/favicons/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Immoly",
              url: "https://immoly.io",
              description:
                "Immoly ist eine Plattform für Immobilienfinanzierung mit Tilgungsrechner und Visualisierung.",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} antialiased`}
      >
        <Script
          src="https://analytics.jakob-lingel.dev/script.js"
          data-website-id="ccf8342c-1b2a-4f38-b8ab-1b7c70acbbd4"
          strategy="afterInteractive"
        ></Script>
        <Toaster position="top-center" />
          {children}
      </body>
    </html>
  );
}
