import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedImage from "./animatedImage";

type PropTypes = {
  image: {
    src: { src: string; height: number; width: number };
    alt: string;
  };
  children: React.ReactNode;
};

export default function DescriptionContainer({ image, children }: PropTypes) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-40 grid-cols-10 gap-x-20 lg:grid lg:gap-y-96">
      <div className="col-span-7 col-start-3 col-end-10 row-span-full">
        {mounted && (
          <>
            <div className="hidden lg:block">
              <AnimatedImage image={image} />
            </div>
            <div className="lg:hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={1800}
                height={1200}
                className="rounded-lg shadow-lg rotate-x-30 rotate-z-10 relative top-10"
              />
            </div>
          </>
        )}
      </div>
      <div className="col-span-4 col-start-1 row-start-1 flex flex-col justify-between gap-y-60 lg:min-h-[200vh]">
        {children}
      </div>
    </div>
  );
}
