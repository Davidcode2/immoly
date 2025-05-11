import CalculationResult from "./models/CalculationResult";

export default function calcTilgung(calculation: CalculationResult) {
    const principalForCalculation = calculation.principal - calculation.down_payment;
    const yearlyRate = calculation.monthly_rate * 12;
    let remainingPrincipal = principalForCalculation;
    const armotizationTable = [];
    let counter = 0;
    while (remainingPrincipal >= 0) {
      if (counter >= 120) {
        console.error('Maximum iterations (120) reached. Stopping calculation to prevent infinite loop.');
        break;
      }
      const interestForYear = remainingPrincipal * (calculation.interest_rate / 100);
      const principalPaidYearly = yearlyRate - interestForYear;
      remainingPrincipal -= principalPaidYearly;
      const armortizationEntry: any = {
        year: armotizationTable.length + 1,
        interest: interestForYear,
        principal: principalPaidYearly,
        yearlyRate: yearlyRate,
        remainingPrincipal: remainingPrincipal,
      };
      armotizationTable.push(armortizationEntry);
      counter++;
    }
    return armotizationTable;
  }
