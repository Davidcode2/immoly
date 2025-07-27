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
        className="mx-auto md:mb-16"
      />
      <div className="mx-auto p-4 md:hidden">
        <IconsHeader />
      </div>
      <div className="mb-10 p-4 text-center font-bold md:hidden">
        Die Plattform für Immobilienkredite. Kalkulieren Sie was möglich ist.
      </div>
    </>
  );
}
