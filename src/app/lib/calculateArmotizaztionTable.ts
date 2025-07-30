import ArmotizationEntry from "./models/ArmotizationEntry";
import CashRoiModel from "./models/cashRoiModel";

export default function calcTilgung(calculation: CashRoiModel): ArmotizationEntry[] {
  if (!calculation) {
    return [];
  }
  const principalForCalculation =
    calculation.principal - calculation.down_payment;
  let yearlyRate = calculation.monthly_rate * 12;
  let remainingPrincipal = principalForCalculation;

  const armotizationTable = [];
  let counter = 0;
  while (remainingPrincipal >= 0.1) {
    if (counter >= 120) {
      console.log(
        "Maximum iterations (120) reached. Stopping calculation to prevent infinite loop.",
      );
      break;
    }
    const interestForYear =
      remainingPrincipal * (calculation.interest_rate / 100);
    let principalPaidYearly = yearlyRate - interestForYear;
    if (remainingPrincipal - principalPaidYearly < 0) {
      principalPaidYearly = remainingPrincipal;
      yearlyRate = Math.round(remainingPrincipal);
      remainingPrincipal = 0;
    } else {
      remainingPrincipal -= principalPaidYearly;
    }

    const armortizationEntry: ArmotizationEntry = {
      year: armotizationTable.length + 1,
      interest: interestForYear,
      principal: principalPaidYearly,
      yearlyRate: yearlyRate,
      remainingPrincipal: remainingPrincipal,
      sondertilgung: findSondertilgung(calculation, armotizationTable)
    }
    armotizationTable.push(armortizationEntry);
    counter++;
  }
  return armotizationTable;
}

const findSondertilgung = (calculation: CashRoiModel, armotizationTable: ArmotizationEntry[]) => {
  if (calculation.sondertilgungen) {
    const sondertilgungForYear = calculation.sondertilgungen.find((x) => x.year === armotizationTable.length + 1);
    return sondertilgungForYear?.amount || 0
  } 
  return 0;
}
