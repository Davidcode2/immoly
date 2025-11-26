export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed top-3 right-3 z-50 cursor-pointer transition-colors hover:text-red-400 p-2"
      onClick={() => onClick()}
      aria-label="Close"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
