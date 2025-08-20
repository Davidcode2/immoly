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

