import Logo from "@/components/hero/logo";

export default function MetaPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="absolute max-md:top-9 top-10 left-10">
        <Logo size="medium" responsive={true} />
      </div>
      {children}
    </div>
  );
}
