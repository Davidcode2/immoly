import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function AnimatedImage({
  image,
}: {
  image: { src: StaticImageData; alt: string };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // map element entering -> leaving viewport
    offset: ["400px end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [50, 0]); // from rotateX(50deg) -> 0
  const rotateZ = useTransform(scrollYProgress, [0, 0.5], [15, 0]); // from rotateZ(15deg) -> 0
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1.0]); // from rotateZ(15deg) -> 0

  return (
    <div
      className="relative z-30 col-span-7 col-start-2 hidden min-h-[200vh] lg:block"
      ref={ref}
    >
      <div className="sticky top-28 h-[60vh]">
        <motion.div style={{ rotateX, rotateZ, scale }} className="rounded-lg">
          <div className="sticky top-28">
            <Image
              src={image.src}
              alt={image.alt}
              width={1800}
              height={1200}
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
