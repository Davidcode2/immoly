export default function ScrollIndicator() {
  return (
    <div className="flex w-full justify-center">
      <div
        className="mb-4 h-6 w-6 animate-bounce sm:hidden"
        onClick={() => window.scroll({ top: 850, behavior: "smooth" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="opacity-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};
