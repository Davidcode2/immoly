type HandleProps = {
  className?: string;
};

export function Handle({ className = "" }: HandleProps) {
  return (
    <div className="absolute rounded-t-2xl w-full bg-linear-to-b from-[var(--background)] to-[var(--background)/90 px-4 py-4 cursor-grab active:cursor-grabbing">
      <div className={`h-2 w-20 mx-auto rounded-full bg-gray-300 ${className}`} />
    </div>
  );
}
