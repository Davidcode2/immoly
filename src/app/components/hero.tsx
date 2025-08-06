import Image from "next/image";
import IconsHeader from "./iconsHeader";

export default function Hero() {
  return (
    <>
      <Image
        src="/immoly_logo_square_transparent_text.webp"
        width={200}
        height={10}
        alt="Logo"
        className="mx-auto dark:invert-0 mb-4 invert"
      />
      <div className="mx-auto p-4">
        <IconsHeader />
      </div>
      <div className="mb-10 p-4 text-center font-thin">
        Die Plattform für Immobilienkredite. Kalkulieren Sie was möglich ist.
      </div>
    </>
  );
}
