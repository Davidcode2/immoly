import { getThemeByCustomerId } from "@/lib/configService";

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
    Object.entries(theme).forEach(
      ([key, value]) => (vars[`--${key as string}`] = value),
    );
    return vars;
  };

  const resolvedParams = await params;
  console.log("EmbedLayout params:", resolvedParams);
  const parsedCustomerId = decodeURIComponent(resolvedParams.customerId);
  const theme = await getThemeByCustomerId(parsedCustomerId);
  const cssVariables = themeToCssVariables(theme);

  return <main style={cssVariables}>{children}</main>;
}
