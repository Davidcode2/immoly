import Image from "next/image";
import Hero from "./hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SloganHero() {
  return (
    <div className="rounded-lg border-slate-200 p-4">
      <Hero />
      <div className="my-10 flex flex-col gap-4 p-4 text-7xl">
        <p className="text-4xl break-words hyphens-auto whitespace-normal">
          Finde Dein perfektes Szenario.
        </p>
        <p className="text-base">
          Dein Traum vom Eigenheim, deine Daten, deine Privatsphäre. Der
          Tilgungsrechner hilft dir, deine Finanzierung zu verstehen – mit
          Echtzeit-Berechnung, Sondertilgungen und Tilgungswechseln.
        </p>

        <p className="text-base">
          Keine Registrierung, Keine Cookies, Keine Datensammlung.
          <Link
            href="/about"
            className="ml-3 inline-flex items-baseline"
          >
            <ArrowRight
              className="mr-1 inline-block self-center"
              strokeWidth={1}
              size={16}
            />
            Mehr erfahren
          </Link>
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
    </div>
  );
}
