import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen max-w-[2000px]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
