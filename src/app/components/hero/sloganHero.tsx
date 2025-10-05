import Image from "next/image";
import ScrollIndicator from "../scrollIndicator";
import Hero from "./hero";
import { useMobileFormOpenStore } from "app/store";

export default function SloganHero() {
  const setShowMobileForm = useMobileFormOpenStore().updateValue;

  return (
    <div className="rounded-lg border-slate-200 p-4">
      <Hero />
      <div className="my-10 flex flex-col gap-4 p-4 text-7xl">
        <p className="text-4xl break-words hyphens-auto whitespace-normal">
          Finden Sie Ihr perfektes Szenario.
        </p>
        <p className="text-base">
          Der Tilgungsrechner mit Berücksichtigung von Sondertilgungen und
          Tilgungswechseln.
        </p>
        <button
          className="max-w-60 text-base rounded-full border border-[var(--grey-accent)] bg-[var(--background)] px-5 py-2 shadow transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]"
          onClick={() => setShowMobileForm(true)}
        >
          Jetzt Starten
        </button>
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
