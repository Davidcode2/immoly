import { getThemeByCustomerId } from "@/lib/configService";
import { Geist, Geist_Mono, Fira_Code } from "next/font/google";

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

export default async function EmbedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ customerId: string }>;
}) {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const themeToCssVariables = (theme: any) => {
    const vars: Record<string, string> = {};
    if (!theme) return vars;
    Object.entries(theme).forEach(([key, value]) => {
      key = key.replaceAll("_", "-");
      vars[`--${key as string}`] = value;
    });
    return vars;
  };

  const isDarkTheme = (theme: any) => {
    if (!theme) return false;
    return theme["name"].includes("dark");
  };

  const themeToCssVariablesString = (theme: any) => {
    if (!theme) return "";
    const mapped = Object.entries(theme).map(([key, value]) => {
      key = key.replaceAll("_", "-");
      return `--${key as string}: ${value}`;
    });
    return mapped.join("; ");
  };

  const resolvedParams = await params;
  console.log("EmbedLayout params:", resolvedParams);
  const parsedCustomerId = decodeURIComponent(resolvedParams.customerId);
  const theme = await getThemeByCustomerId(parsedCustomerId);

  return (
    <html lang="de" className={`${isDarkTheme(theme) && "dark"}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} antialiased`}
      >
        <style
          precedence="default"
          href="/"
        >{`:root { ${themeToCssVariablesString(theme)} `}</style>
        <main>{children}</main>
      </body>
    </html>
  );
}
