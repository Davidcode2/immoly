import Image from "next/image";
import IconsHeader from "./iconsHeader";

export default function Hero() {
  return (
    <>
      <Image
        src="/immoly_logo_square_transparent_cut_gradient.webp"
        width={200}
        height={10}
        alt="Logo"
        className="mx-auto mb-4"
      />
      <div className="mx-auto p-4">
        <IconsHeader />
      </div>
      <div className="mb-10 p-4 text-center font-thin">
        Die Plattform für Immobilienkredite. Kalkulieren Sie was möglich ist.
        <ScrollIndicator />
      </div>
    </>
  );
}

const ScrollIndicator = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="mt-8 sm:hidden mb-4 h-6 w-6 animate-bounce" onClick={ () => window.scroll({ top: 280, behavior: "smooth"})}>
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
