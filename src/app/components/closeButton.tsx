export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed top-5 right-5 z-40 cursor-pointer transition-colors hover:text-red-400"
      onClick={() => onClick()}
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
