export function getGrundsteuer(bundesland: string) {
  switch (bundesland) {
    case "Baden-Wuerttemberg":
      return 5.0;
    case "Bayern":
      return 3.5;
    case "Berlin":
      return 6.0;
    case "Brandenburg":
      return 6.5;
    case "Bremen":
      return 5.0;
    case "Hamburg":
      return 5.5;
    case "Hessen":
      return 6.0;
    case "Mecklenburg-Vorpommern":
      return 6.0;
    case "Niedersachsen":
      return 5.0;
    case "Nordrhein-Westfalen":
      return 6.5;
    case "Rheinland-Pfalz":
      return 5.0;
    case "Saarland":
      return 6.5;
    case "Sachsen":
      return 5.5;
    case "Sachsen-Anhalt":
      return 5.0;
    case "Schleswig-Holstein":
      return 6.5;
    case "Thueringen":
      return 5.0;
    default:
      console.error("Unknown bundesland:", bundesland);
      return 5.0;
  }
}

export const bundeslaender = [
  "Baden-Wuerttemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thueringen",
];
