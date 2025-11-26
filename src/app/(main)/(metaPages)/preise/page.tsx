import StyledCard from "@/components/about/styledCard";
import BulletPointItem from "@/components/prices/bulletPointItem";
import SeatCard from "@/components/prices/seatCard";
import { Timer, TrendingUp } from "lucide-react";

export default function PreisePage() {
  return (
    <div className="mx-10 lg:mt-10 lg:mr-20 lg:ml-40">
      <div className="grid gap-10">
        <div className="mb-10 text-lg">
          <h4 className="font-fira-code text-4xl">
            Der Mehrwert für Ihr Business
          </h4>
          <p className="py-6">
            Sie vermitteln Kredite, haben eine öffentliche Website und möchten
            Ihren Kunden das bestmögliche Erlebnis bieten? Mit unserem Rechner,
            als DropIn oder individuell auf Ihr Unternehmen zugeschnitten,
            zeigen Sie Ihren Kunden, dass Sie nicht nur Kredite verkaufen,
            sondern mit echter Beratung zur Seite stehen.
          </p>
        </div>
        <div className="mb-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:-ml-30 lg:-mr-8 xl:-mr-0 xl:-ml-20">
          <StyledCard
            header={"DropIn"}
            icon={<Timer stroke="var(--background)" />}
          >
            <SeatCard header="9€/Monat">
              <BulletPointItem>Eine Seite</BulletPointItem>
              <BulletPointItem>Unbegrenzte Berechnungen</BulletPointItem>
              <BulletPointItem>
                Eines von drei wunderschönen Designs
              </BulletPointItem>
              <BulletPointItem plus={true}>Bereit in 24h</BulletPointItem>
            </SeatCard>
          </StyledCard>
          <div className="rounded-lg border border-[var(--secondary)] xl:scale-105 h-fit">
            <StyledCard header={"Individuell"}>
              <SeatCard
                header="12€/Monat"
                subHeader="einmalig 500€ Einrichtungsgebühr"
              >
                <BulletPointItem>Alles aus DropIn</BulletPointItem>
                <BulletPointItem plus={true}>
                  Individuell zugeschnitten auf Ihr Business
                </BulletPointItem>
                <BulletPointItem plus={true}>Eigenes Logo</BulletPointItem>
                <BulletPointItem plus={true}>
                  Angepasst an Ihr Farbschema
                </BulletPointItem>
                <BulletPointItem plus={true}>Premium-Support</BulletPointItem>
              </SeatCard>
            </StyledCard>
          </div>
          <StyledCard
            header={"Enterprise"}
            icon={<TrendingUp stroke="var(--background)" />}
          >
            <SeatCard header="Sprechen Sie mit uns">
              <BulletPointItem>Alles aus Individuell</BulletPointItem>
              <BulletPointItem plus={true}>Unbegrenzte Seiten</BulletPointItem>
              <BulletPointItem plus={true}>Multi Domain</BulletPointItem>
              <BulletPointItem plus={true}>Analytics</BulletPointItem>
              <BulletPointItem plus={true}>Tracking</BulletPointItem>
            </SeatCard>
          </StyledCard>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
