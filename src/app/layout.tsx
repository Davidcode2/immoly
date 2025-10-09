import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import Head from "next/head";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immoly - Immobilienfinanzierung",
  description:
    "Immoly ist eine Plattform für Immobilienfinanzierung. Berechne Deine Finanzierungsmöglichkeiten mit Tilgungstabelle und Visualisierung.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://analytics.jakob-lingel.dev/script.js"
          data-website-id="ccf8342c-1b2a-4f38-b8ab-1b7c70acbbd4"
          strategy="afterInteractive"
        ></Script>
        <Toaster position="top-center" />
        <ThemeProvider
          defaultTheme="green-mist-dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto min-h-screen max-w-[2000px]">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
