export default function SeatCard({
  children,
  header,
  subHeader,
}: {
  children: React.ReactNode;
  header: string;
  subHeader?: string;
}) {
  return (
    <div className="mb-4 flex flex-col justify-center">
      <div className="mb-8 text-center max-md:mt-6">
        <div className="text-4xl">{header}</div>
        {subHeader}
      </div>
      <div className="grid gap-y-4">{children}</div>
    </div>
  );
}
