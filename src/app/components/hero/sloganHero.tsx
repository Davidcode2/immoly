import Image from "next/image";
import ScrollIndicator from "../scrollIndicator";
import Hero from "./hero";

export default function SloganHero() {
  return (
    <div className="rounded-lg border-slate-200 p-4">
      <Hero />
      <div className="my-10 flex flex-col gap-4 p-4 text-7xl">
        <p className="text-4xl hyphens-auto break-words whitespace-normal">
          Der Tilgungsrechner für Ihre Exploration.<br/> <br/> Finden Sie Ihr perfektes
          Szenario.
        </p>
        <div className="flex">
          <p>Got</p>
          <Image
            src="/images/icons/flaticon_house.png"
            alt="Haus Strichzeichnung"
            height="40"
            width="80"
            className="dark:invert"
          />
        </div>
        <p className="text-7xl">Immo?</p>
      </div>
      <ScrollIndicator />
    </div>
  );
}
