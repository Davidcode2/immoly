type HandleProps = {
  className?: string;
};

export function Handle({ className = "" }: HandleProps) {
  return (
    <div className="bg-[var(--ultralight-accent)] z-30 w-full cursor-grab rounded-t-2xl py-4 active:cursor-grabbing">
      <div
        className={`mx-auto h-2 w-24 rounded-full bg-gray-300 ${className} px-4`}
      />
    </div>
  );
}
