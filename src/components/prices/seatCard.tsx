export default function SeatCard({
  children,
  header,
  subHeader,
  tax = true
}: {
  children: React.ReactNode;
  header: string;
  subHeader?: string;
  tax?: boolean;
}) {
  return (
    <div className="mb-4 flex flex-col justify-center">
      <div className="mb-8 text-center max-md:mt-6">
        <div className="text-4xl">{header}</div>
        {subHeader}
        { tax && <div className="text-xs dark:text-[var(--grey-accent)]">zzgl. USt.</div> }
      </div>
      <div className="grid gap-y-4">{children}</div>
    </div>
  );
}
