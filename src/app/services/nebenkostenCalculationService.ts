import { DEFAULT_BUNDESLAND } from "app/constants";
import { getGrundsteuer } from "./nebenkostenGrundsteuer";

export default class NebenkostenCalculator {
  private principal: number;

  private notarkosten: number = 0;
  private grundbuchkosten: number = 0;
  private maklergebuehr: number = 0;
  private summe: number = 0;
  private maklergebuehrPercentage: number = 3.57;
  bundesland = DEFAULT_BUNDESLAND;

  constructor(
    principal: number,
    maklergebuehrPercentage: number,
    bundesland?: string,
  ) {
    this.principal = principal;
    this.maklergebuehrPercentage = maklergebuehrPercentage;
    this.bundesland =
      bundesland && bundesland != "" ? bundesland : DEFAULT_BUNDESLAND;
    console.log(
      "NebenkostenCalculator created with principal: ",
      principal,
      " maklergebuehr: ",
      maklergebuehrPercentage,
      " bundesland: ",
      this.bundesland,
    );
  }

  calcSumme = () => {
    if (this.summe > 0) {
      return this.summe;
    }
    this.summe =
      this.calcNotarkosten() +
      this.calcGrundbuchkosten() +
      this.calcMaklergebuehr() +
      this.calcGrunderwerbsteuer(this.bundesland);
    console.log("Nebenkosten Summe: ", this.summe);
    return this.summe;
  };

  calcNotarkosten = () => {
    if (this.notarkosten > 0) {
      return this.notarkosten;
    }
    this.notarkosten = this.principal * 0.015;
    return this.notarkosten;
  };

  calcGrundbuchkosten = () => {
    if (this.grundbuchkosten > 0) {
      return this.grundbuchkosten;
    }
    this.grundbuchkosten = this.principal * 0.005;
    return this.grundbuchkosten;
  };

  calcMaklergebuehr = () => {
    if (this.maklergebuehr > 0) {
      return this.maklergebuehr;
    }
    this.maklergebuehr = this.principal * (this.maklergebuehrPercentage / 100);
    return this.maklergebuehr;
  };

  calcGrunderwerbsteuer = (bundesland?: string) => {
    const _bundesland =
      bundesland && bundesland != "" ? bundesland : this.bundesland;
    const tax = getGrundsteuer(_bundesland) / 100;
    return this.principal * tax;
  };
}

export class NebenkostenCalculatorForNebenkostenComponent {
  private principal: number;

  private notarkosten: number = 0;
  private grundbuchkosten: number = 0;
  private maklergebuehr: number = 0;
  private summe: number = 0;
  private maklergebuehrPercentage: number = 3.57;
  bundesland = DEFAULT_BUNDESLAND;

  constructor(
    principal: number,
    maklergebuehrPercentage: number,
    notarkosten: number,
    grundbuchkosten: number,
    bundesland?: string,
  ) {
    this.principal = principal;
    this.maklergebuehrPercentage =
      maklergebuehrPercentage || this.maklergebuehrPercentage;
    this.bundesland =
      bundesland && bundesland != "" ? bundesland : DEFAULT_BUNDESLAND;
    this.notarkosten = notarkosten;
    this.grundbuchkosten = grundbuchkosten;

    console.log(
      "NebenkostenCalculator created with principal: ",
      principal,
      " maklergebuehr: ",
      maklergebuehrPercentage,
      " bundesland: ",
      this.bundesland,
    );
  }

  calcSumme = () => {
    if (this.summe > 0) {
      return this.summe;
    }
    this.summe =
      this.calcNotarkosten() +
      this.calcGrundbuchkosten() +
      this.calcMaklergebuehr() +
      this.calcGrunderwerbsteuer(this.bundesland);
    console.log("Nebenkosten Summe: ", this.summe);
    return this.summe;
  };

  calcNotarkosten = () => {
    if (this.notarkosten > 0) {
      return this.notarkosten;
    }
    this.notarkosten = this.principal * 0.015;
    return this.notarkosten;
  };

  calcGrundbuchkosten = () => {
    if (this.grundbuchkosten > 0) {
      return this.grundbuchkosten;
    }
    this.grundbuchkosten = this.principal * 0.005;
    return this.grundbuchkosten;
  };

  calcMaklergebuehr = () => {
    if (this.maklergebuehr > 0) {
      return this.maklergebuehr;
    }
    this.maklergebuehr = this.principal * (this.maklergebuehrPercentage / 100);
    return this.maklergebuehr;
  };

  calcGrunderwerbsteuer = (bundesland?: string) => {
    const _bundesland =
      bundesland && bundesland != "" ? bundesland : this.bundesland;
    const tax = getGrundsteuer(_bundesland) / 100;
    return this.principal * tax;
  };
}
