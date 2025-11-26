import StyledCard from "@/components/about/styledCard";
import BulletPointItem from "@/components/prices/bulletPointItem";

export default function PreisePage() {
  return (
    <div className="mx-10 lg:mt-10 lg:mr-20 lg:ml-40">
      <div className="grid gap-10">
        <div className="text-lg">
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
        <div className="grid gap-10 lg:grid-cols-3">
          <StyledCard header={"DropIn"}>
            <div className="flex flex-col justify-center">
              <div>
                <div className="mb-8 text-center text-4xl">9€/Monat</div>
              </div>
              <div className="grid gap-y-4">
                <BulletPointItem>Eine Seite</BulletPointItem>
                <BulletPointItem>Unbegrenzte Berechnungen</BulletPointItem>
                <BulletPointItem>
                  Eines von drei wunderschönen Designs
                </BulletPointItem>
                <BulletPointItem plus={true}>Bereit in 24h</BulletPointItem>
              </div>
            </div>
          </StyledCard>
          <StyledCard header={"Individuell"}>
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <div className="text-center text-4xl">12€/Monat</div>
                <div className="text-center">
                  einmalig 500€ Einrichtungsgebühr
                </div>
              </div>
              <div className="grid gap-y-4">
                <BulletPointItem>Alles aus DropIn</BulletPointItem>
                <BulletPointItem plus={true}>
                  Individuell zugeschnitten auf Ihr Business
                </BulletPointItem>
                <BulletPointItem plus={true}>Eigenes Logo</BulletPointItem>
                <BulletPointItem plus={true}>
                  Angepasst an Ihr Farbschema
                </BulletPointItem>
                <BulletPointItem plus={true}>Premium-Support</BulletPointItem>
              </div>
            </div>
          </StyledCard>
          <StyledCard header={"Enterprise"}>
            <div className="flex flex-col justify-center">
              <div className="mb-8">Sprechen Sie mit uns</div>
              <div className="grid gap-y-4">
                <BulletPointItem>Alles aus Individuell</BulletPointItem>
                <BulletPointItem plus={true}>
                  Unbegrenzte Seiten
                </BulletPointItem>
                <BulletPointItem plus={true}>Multi Domain</BulletPointItem>
                <BulletPointItem plus={true}>Analytics</BulletPointItem>
                <BulletPointItem plus={true}>Tracking</BulletPointItem>
              </div>
            </div>
          </StyledCard>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
