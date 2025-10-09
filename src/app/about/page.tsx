"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useScreenshotThemer from "@/hooks/useScreenshotThemer";
import AboutIntro from "@/components/about/aboutIntro";
import StyledCard from "@/components/about/styledCard";

export default function About() {
  const images = useScreenshotThemer();

  function AnimatedImage({ image }: { image: any }) {
    const ref = useRef<HTMLElement | null>(null);
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
        className="relative col-span-7 col-start-2 z-30 hidden min-h-[200vh] lg:block"
        ref={ref}
      >
        <div className="sticky top-28 h-[60vh]">
          <motion.div
            style={{ rotateX, rotateZ, scale }}
            className="rounded-lg"
          >
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

  return (
    <div className="mx-10 lg:mr-20 lg:ml-40">
      <AboutIntro />
      <div className="mt-40 grid-cols-10 gap-x-20 gap-y-96 lg:grid">
        <div className="row-span-full col-start-3 col-span-7 col-end-10">
          <AnimatedImage image={images[0]} />
        </div>
        <div className="col-span-4 col-start-1 row-start-1 flex min-h-[200vh] flex-col justify-between gap-y-60">
          <StyledCard header={"Einfach und Übersichtlich"}>
            <div>
              Unser Tilgungsrechner ist einfach und übersichtlich gestaltet –
              alle wichtigen Eingaben auf einen Blick, ohne unnötigen
              Schnickschnack.
            </div>
          </StyledCard>
          <StyledCard header={"Sicher und Privat"}>
            <div>
              Keine Registrierung, keine versteckte Datensammlung – deine
              Eingaben bleiben privat und werden nicht gespeichert.
            </div>
          </StyledCard>
          <StyledCard header={"Kostenlos und Werbefrei"}>
            <div>
              Passe Zinsen, Tilgung und Sonderzahlungen individuell an und sieh
              sofort, wie sich deine Finanzierung verändert.
            </div>
          </StyledCard>
        </div>
      </div>
      <div className="mt-40 grid-cols-10 gap-x-20 gap-y-96 lg:grid my-96">
        <div className="row-span-full col-start-3 col-span-7 col-end-10">
          <AnimatedImage image={images[1]} />
        </div>
        <div className="row-start-1 col-span-4 col-start-1 flex min-h-[200vh] flex-col justify-between gap-y-60">
          <StyledCard header={"Alles auf einen Blick"}>
            <div>
              Interaktive Diagramme zeigen dir auf einen Blick, wie sich
              Restschuld und Zinslast über die Jahre entwickeln.
            </div>
          </StyledCard>
          <StyledCard header={"Nachvollziehbar"}>
            <div>
              Alle Berechnungen werden nachvollziehbar dargestellt – so weißt du
              immer, wie dein Tilgungsplan entsteht.
            </div>
          </StyledCard>
        </div>
      </div>
      <div className="mt-40 grid-cols-10 gap-x-20 gap-y-96 lg:grid">
        <div className="row-span-full col-start-3 col-span-7 col-end-10">
          <AnimatedImage image={images[2]} />
        </div>
        <div className="row-start-1 col-span-4 col-start-1 flex min-h-[200vh] flex-col justify-between gap-y-60">
          <StyledCard header={"Alles auf einen Blick"}>
            <div>
              Interaktive Diagramme zeigen dir auf einen Blick, wie sich
              Restschuld und Zinslast über die Jahre entwickeln.
            </div>
          </StyledCard>
          <StyledCard header={"Nachvollziehbar"}>
            <div>
              Alle Berechnungen werden nachvollziehbar dargestellt – so weißt du
              immer, wie dein Tilgungsplan entsteht.
            </div>
          </StyledCard>
        </div>
      </div>
    </div>
  );
}
