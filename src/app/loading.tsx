export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-700">Lädt...</p>
    </div>
  );
}
