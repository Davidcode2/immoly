import ArmotizationEntry from "./models/ArmotizationEntry";
import CashRoiModel from "./models/cashRoiModel";

export default function calcTilgung(
  calculation: CashRoiModel,
): ArmotizationEntry[] {

  if (!calculation) {
    return [];
  }

  const kreditsumme = calculation.principal - calculation.down_payment;
  const annuitaet = calculation.monthly_rate * 12;

  const armotizationTable = calculateArmotizationTable(kreditsumme, annuitaet, calculation);
  return armotizationTable;
}

const calculateArmotizationTable = (restSumme: number, annuitaet: number, calculation: CashRoiModel) => {
  const MAX_ITERATIONS = 120;
  let counter = 0;
  const armotizationTable = [];
  while (restSumme >= 0.1) {
    if (counter >= MAX_ITERATIONS) {
      logMaximumIterationsReached(MAX_ITERATIONS);
      break;
    }

    const currentYear = armotizationTable.length + 1;
    const sondertilgung = findSondertilgung(calculation, currentYear);
    const tilgungswechsel = findTilgungswechsel(calculation, currentYear);

    const interestForYear = calcInterest(restSumme, calculation.interest_rate);

    if (tilgungswechsel > 0) {
      console.log(`Tilgungswechsel for year ${currentYear}: ${tilgungswechsel}`);
      annuitaet = tilgungswechsel * 12;
    }
    let tilgung = annuitaet - interestForYear;

    if (sondertilgung > 0) {
      console.log(`Year: ${currentYear}, Remaining Principal: ${restSumme}, Sondertilgung: ${sondertilgung}`);
      restSumme -= sondertilgung;
    }

    if (restSumme - tilgung > 0) {
      restSumme -= tilgung;
    } else {
      tilgung = restSumme;
      annuitaet = Math.round(restSumme);
      restSumme = 0;
    }

    const armortizationEntry: ArmotizationEntry = {
      year: currentYear,
      interest: interestForYear,
      principal: tilgung,
      yearlyRate: annuitaet,
      remainingPrincipal: restSumme,
      sondertilgung: sondertilgung,
      tilgungswechsel: tilgungswechsel,
    };
    armotizationTable.push(armortizationEntry);
    counter++;
  }
  return armotizationTable;
};

const findSondertilgung = (
  calculation: CashRoiModel,
  year: number
) => {
  if (calculation.sondertilgungen) {
    const sondertilgungForYear = calculation.sondertilgungen.find(
      (x) => x.year === year,
    );
    return sondertilgungForYear?.amount || 0;
  }
  return 0;
};

const calcInterest = (
  remainingPrincipal: number,
  interestRate: number,
): number => {
  return remainingPrincipal * (interestRate / 100);
};

const logMaximumIterationsReached = (max_iterations: number) => {
  console.log(
    `Maximum iterations (${max_iterations}) reached. Stopping calculation to prevent infinite loop.`,
  );
};

const findTilgungswechsel = (calculation: CashRoiModel, year: number) => {
  if (calculation.tilgungswechsel) {
    const tilgungswechselForYear = calculation.tilgungswechsel.find(
      (x) => x.year === year,
    );
    return tilgungswechselForYear?.amount || 0;
  }
  return 0;
}
