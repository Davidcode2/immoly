import Image from "next/image";
import ScrollIndicator from "../scrollIndicator";
import Hero from "./hero";

export default function SloganHero() {
  return (
    <div className="rounded-lg border-slate-200 p-4">
      <Hero />
      <div className="my-10 flex flex-col gap-4 text-7xl">
        <div className="flex">
          <p>Got</p>
          <Image
            src="/images/icons/flaticon_house.png"
            alt="Haus Strichzeichnung"
            height="40"
            width="80"
          />
        </div>
        <p className="text-7xl">Immo?</p>
        <p className="text-base">Kalkulieren Sie was möglich ist</p>
      </div>
      <ScrollIndicator />
    </div>
  );
}
