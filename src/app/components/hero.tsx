import Image from "next/image";
import IconsHeader from "./iconsHeader";

export default function Hero() {
  return (
    <div className="border border-[var(--accent)] rounded-lg shadow bg-[url('/images/background/green_wavy.jpg')] bg-cover ">
      <div className="rounded-lg backdrop-blur p-4 md:p-8">
        <Image
          src="/immoly_logo_square_transparent_text.webp"
          width={150}
          height={10}
          alt="Logo"
          className="mb-4"
        />
        <div className="p-2">
          <IconsHeader />
        </div>
      </div>
    </div>
  );
}

const ScrollIndicator = () => {
  return (
    <div className="flex w-full justify-center">
      <div
        className="mt-8 mb-4 h-6 w-6 animate-bounce sm:hidden"
        onClick={() => window.scroll({ top: 280, behavior: "smooth" })}
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
