export default function StyledCard({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-x-6 rounded-lg bg-radial-[at_50%_75%] from-[var(--background)]/90 to-[var(--background)] backdrop-blur dark:shadow-[0_4px_50px_var(--success)]/20">
        <div className="flex text-xl justify-start items-center gap-x-4 rounded-t-lg border-b px-10 py-8">
          <div className="h-fit w-fit rounded-full bg-[var(--dark-accent)] p-6"></div>
          {header}
        </div>
        <div className="px-6 py-3 xl:pr-40 xl:pl-10 xl:py-10">{children}</div>
      </div>
    </div>
  );
}
