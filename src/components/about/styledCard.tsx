import { Check } from "lucide-react";

export default function StyledCard({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <div className="lg:h-full">
      <div className="flex flex-col gap-x-6 rounded-lg border bg-radial-[at_50%_75%] from-[var(--background)]/90 to-[var(--background)] shadow-xl backdrop-blur dark:shadow-[0_4px_50px_var(--foreground)]/20">
        <div className="flex items-center justify-start gap-x-4 rounded-t-lg border-b px-10 py-8 text-xl">
          <div className="h-fit w-fit rounded-full bg-[var(--dark-accent)] p-6">
            <Check stroke="var(--background)" />
          </div>
          {header}
        </div>
        <div className="px-6 py-3 xl:py-10 xl:pr-48 xl:pl-10">{children}</div>
      </div>
    </div>
  );
}
