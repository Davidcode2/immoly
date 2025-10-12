"use client";

import useScreenshotThemer from "@/hooks/useScreenshotThemer";
import DescriptionContainer from "./descriptionContainer";
import StyledCard from "./styledCard";
export default function Descriptions() {
  const images = useScreenshotThemer();

  return (
    <div className="max-lg:mb-40">
      <DescriptionContainer image={images[0]}>
        <StyledCard header={"Einfach und Übersichtlich"}>
          <div>
            Unser Tilgungsrechner ist einfach und übersichtlich gestaltet – alle
            wichtigen Eingaben auf einen Blick, ohne unnötigen Schnickschnack.
          </div>
        </StyledCard>
        <StyledCard header={"Sicher und Privat"}>
          <div>
            Keine Registrierung, keine versteckte Datensammlung – deine Eingaben
            bleiben privat und werden nicht gespeichert.
          </div>
        </StyledCard>
      </DescriptionContainer>
      <DescriptionContainer image={images[1]}>
        <StyledCard header={"Alles auf einen Blick"}>
          <div>
            Passe Zinsen, Tilgung und Sonderzahlungen individuell an und sieh
            sofort, wie sich deine Finanzierung verändert.
          </div>
        </StyledCard>
        <StyledCard header={"Komplett"}>
          <div>
          Mit Tilgungswechseln und Sondertilgung kannst du dein Szenario realistisch abbilden.
          </div>
        </StyledCard>
      </DescriptionContainer>
      <DescriptionContainer image={images[2]}>
        <StyledCard header={"Interaktiv"}>
          <div>
            Interaktive Diagramme zeigen dir auf einen Blick, wie sich
            Restschuld und Zinslast über die Jahre entwickeln.
          </div>
        </StyledCard>
        <StyledCard header={"Darkmode"}>
          <div>
          Was jeder bisher an einem Tilgungsrechner vermisst hat: Darkmode und mehrere Farbschemata
          </div>
        </StyledCard>
      </DescriptionContainer>
    </div>
  );
}
