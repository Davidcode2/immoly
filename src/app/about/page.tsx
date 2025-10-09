"use client";

import author_coding_grandpa from "/public/images/author_coding_looking_like_a_grandpa.png";
import immoly_nebenkosten_screenshot from "/public/images/green_mist_screenshots/screenshot-nebenkosten.png";
import green_mist_screenshot from "/public/images/green_mist_screenshots/screenshot-green-mist-full.png";
import hearth_stone_screenshot1 from "/public/images/hearth_stone_screenshots/screenshot-full-hearth-stone.png";
import hearth_stone_screenshot2 from "/public/images/hearth_stone_screenshots/2025-10-08-21-05-35.png";
import hearth_stone_screenshot3 from "/public/images/hearth_stone_screenshots/2025-10-08-21-05-53.png";
import blue_dream_screenshot1 from "/public/images/blue_dream_screenshots/2025-10-08-21-03-28.png";
import blue_dream_screenshot2 from "/public/images/blue_dream_screenshots/2025-10-08-21-03-47.png";
import blue_dream_screenshot3 from "/public/images/blue_dream_screenshots/2025-10-08-21-04-15.png";
import green_mist_light_screenshot1 from "/public/images/green_mist_light_screenshots/2025-10-08-21-13-55.png";
import green_mist_light_screenshot2 from "/public/images/green_mist_light_screenshots/2025-10-08-21-14-07.png";
import green_mist_light_screenshot3 from "/public/images/green_mist_light_screenshots/2025-10-08-21-14-16.png";
import green_mist_light_screenshot4 from "/public/images/green_mist_light_screenshots/2025-10-08-21-14-27.png";
import green_mist_light_screenshot5 from "/public/images/green_mist_light_screenshots/2025-10-08-21-14-37.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function About() {
  const { theme } = useTheme();

  const green_mist_screenshots = [
    {
      src: immoly_nebenkosten_screenshot,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: green_mist_screenshot,
      alt: "Screenshot der Nebenkosten Seite",
    },
  ];

  const green_mist_light_screenshots = [
    {
      src: green_mist_light_screenshot1,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: green_mist_light_screenshot2,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: green_mist_light_screenshot3,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: green_mist_light_screenshot4,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: green_mist_light_screenshot5,
      alt: "Screenshot der Nebenkosten Seite",
    },
  ];

  const blue_dream_screenshots = [
    {
      src: blue_dream_screenshot1,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: blue_dream_screenshot2,
      alt: "Screenshot der Nebenkosten Seite",
    },
    {
      src: blue_dream_screenshot3,
      alt: "Screenshot der Nebenkosten Seite",
    },
  ];

  const hearth_stone_screenshots = [
    {
      src: hearth_stone_screenshot1,
      alt: "Screenshot des Tilgungsrechners in Hearth Stone Theme",
    },
    {
      src: hearth_stone_screenshot2,
      alt: "Screenshot des Tilgungsrechners mit Zeit bis zur Tilgung in Hearth Stone Theme",
    },
    {
      src: hearth_stone_screenshot3,
      alt: "Screenshot der Nebenkosten Seite in Hearth Stone Theme",
    },
  ];

  const themeAdjustedScreenshots = () => {
    switch (theme) {
      case "green-mist-dark":
        return green_mist_screenshots;
      case "blue-dream-dark":
        return blue_dream_screenshots;
      case "hearth-stone-dark":
        return hearth_stone_screenshots;
      default:
        return green_mist_light_screenshots;
    }
  };

  const images = themeAdjustedScreenshots();

  function AnimatedImage({ image }: { image: any }) {
    const ref = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      // map element entering -> leaving viewport
      offset: ["start end", "end start"],
    });
    const rotateX = useTransform(scrollYProgress, [0, 1], [50, 0]); // from rotateX(50deg) -> 0
    const rotateZ = useTransform(scrollYProgress, [0, 0.5], [15, 0]); // from rotateZ(15deg) -> 0
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]); // from rotateZ(15deg) -> 0

    return (
      <motion.div
        ref={ref}
        style={{ rotateX, rotateZ, scale }}
        className="sticky top-28 col-start-2 mb-96 rounded-lg"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1800}
          height={1200}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    );
  }

  return (
    <div className="mx-40">
      <div className="grid grid-cols-2 gap-x-10">
        <Image
          src={author_coding_grandpa}
          alt="Picture of the author"
          width={500}
          height={500}
          className="justify-self-center rounded-full"
        />
        <div>
          <h4 className="text-4xl">Hi, ich bin Jakob</h4>
          <p className="py-6">
            Vor einiger Zeit haben wir uns gefragt wie es wäre in den eigenen
            vier Wänden zu wohnen. Also haben wir uns mit Immobilienfinanzierung
            beschäftigt und schnell herausgefunden, dass die Kohle nicht reicht.
            Jedenfalls war ich mit den Tilgungsrechnern die ich online gefunden
            habe nicht zufrieden, da sie entweder nicht schön aussahen oder nur
            meine Daten abgreifen wollten. Ich dachte, es wäre vielleicht ganz
            nett, einen eigenen Rechner zu bauen. Immoly.io ist das Ergebnis.
            Ich hoffe, dass du Spaß damit hast. Du kannst auch unseren
            Immobilientraum unterstützen, indem du auf einen der Affiliate-Links
            klickst.
          </p>
        </div>
      </div>
      <div className="mt-40 grid grid-cols-[1fr_2fr] grid-rows-3 gap-x-20 gap-y-96">
        <div className="flex flex-col">
          <div className="my-20 flex gap-x-6">
            <div className="h-fit w-fit rounded-full bg-[var(--primary)] p-6"></div>
            <div>
              Unser Tilgungsrechner ist einfach und übersichtlich gestaltet –
              alle wichtigen Eingaben auf einen Blick, ohne unnötigen
              Schnickschnack.
            </div>
          </div>
          <div className="my-20 flex gap-x-6">
            <div className="h-fit w-fit rounded-full bg-[var(--primary)] p-6"></div>
            <div>
              Keine Registrierung, keine versteckte Datensammlung – deine
              Eingaben bleiben privat und werden nicht gespeichert.
            </div>
          </div>
          <div className="my-20 flex gap-x-6">
            <div className="h-fit w-fit rounded-full bg-[var(--primary)] p-6"></div>
            <div>
              Passe Zinsen, Tilgung und Sonderzahlungen individuell an und sieh
              sofort, wie sich deine Finanzierung verändert.
            </div>
          </div>
        </div>
        <div className="col-start-1 row-start-2 flex flex-col gap-y-96">
          <div className="my-20 flex gap-x-6">
            <div className="h-fit w-fit rounded-full bg-[var(--primary)] p-6"></div>
            <div>
              Interaktive Diagramme zeigen dir auf einen Blick, wie sich
              Restschuld und Zinslast über die Jahre entwickeln.
            </div>
          </div>
          <div className="row-start-2 my-20 flex gap-x-6">
            <div className="h-fit w-fit rounded-full bg-[var(--primary)] p-6"></div>
            <div>
              Alle Berechnungen werden nachvollziehbar dargestellt – so weißt du
              immer, wie dein Tilgungsplan entsteht.
            </div>
          </div>
        </div>
        {images.map((image, index) => (
          <AnimatedImage key={index} image={image} />
        ))}
      </div>
    </div>
  );
}
