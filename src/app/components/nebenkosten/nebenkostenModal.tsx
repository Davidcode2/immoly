export default function NebenkostenModal({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="fixed inset-0 z-40 backdrop-blur-sm transition-all opacity-100">
      <div className="sticky top-32 md:top-72 z-50 flex content-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
