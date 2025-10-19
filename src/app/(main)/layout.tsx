import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/theme-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
