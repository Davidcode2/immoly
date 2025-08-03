export default class NebenkostenCalculator {
  private principal: number;

  notarkosten: number = 0;
  grundbuchkosten: number = 0;
  maklergebuehr: number = 0;
  grunderwerbsteuer: number = 0;
  summe: number = 0;

  constructor(principal: number) {
    this.principal = principal;
  }

  calcSumme = () => {
    if (this.summe > 0) {
      return this.summe;
    }
    this.summe =
      this.calcNotarkosten() +
      this.calcGrundbuchkosten() +
      this.calcMaklergebuehr() +
      this.calcGrunderwerbsteuer("Baden-Württemberg");
    return this.summe;
  };

  calcNotarkosten = () => {
    if (this.notarkosten > 0) {
      return this.notarkosten
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
    this.maklergebuehr = this.principal * 0.0357;
    return this.maklergebuehr;
  };

  calcGrunderwerbsteuer = (bundesland: string) => {
    switch (bundesland) {
      case "Baden-Württemberg":
        return this.principal * 0.05;
      case "Bayern":
        return this.principal * 0.03;
      case "Berlin":
        return this.principal * 0.06;
      case "Brandenburg":
        return this.principal * 0.06;
      case "Bremen":
        return this.principal * 0.05;
      case "Hamburg":
        return this.principal * 0.04;
      case "Hessen":
        return this.principal * 0.06;
      case "Mecklenburg-Vorpommern":
        return this.principal * 0.06;
      case "Niedersachsen":
        return this.principal * 0.05;
      case "Nordrhein-Westfalen":
        return this.principal * 0.06;
      case "Rheinland-Pfalz":
        return this.principal * 0.05;
      case "Saarland":
        return this.principal * 0.06;
      case "Sachsen":
        return this.principal * 0.03;
      case "Sachsen-Anhalt":
        return this.principal * 0.02;
      case "Schleswig-Holstein":
        return this.principal * 0.05;
      case "Thüringen":
        return this.principal * 0.03;
      default:
        return this.principal * 0.04;
    }
  };
}
