import { DEFAULT_BUNDESLAND } from "app/constants";
import { getGrundsteuer } from "./nebenkostenGrundsteuer";

export default class NebenkostenCalculator {
  private principal: number;

  private notarkosten: number = 0;
  private grundbuchkosten: number = 0;
  private maklergebuehr: number = 0;
  private summe: number = 0;
  maklergebuehrPercentage: number = 3.57;
  bundesland = DEFAULT_BUNDESLAND;

  constructor(principal: number, maklergebuehr?: number, bundesland?: string) {
    this.principal = principal;
    this.maklergebuehr = maklergebuehr || 0;
    this.bundesland = (bundesland && bundesland != "") ? bundesland : DEFAULT_BUNDESLAND;
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
    const _bundesland = (bundesland && bundesland != "") ? bundesland : this.bundesland;
    const tax = getGrundsteuer(_bundesland) / 100;
    return this.principal * tax;
  };
}
