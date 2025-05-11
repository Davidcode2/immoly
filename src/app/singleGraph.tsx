import CalculationResult from "./lib/models/CalculationResult";

export default function SingleGraph({ calculation }: { calculation: CalculationResult }) {
  console.log(calculation);

  const calcTilgung = (principal: number, interest: number, monthlyRate: number) => {
    const yearlyRate = monthlyRate * 12;
    let remainingPrincipal = principal;
    const armotizationTable = [];
    while (remainingPrincipal >= 0) {
      const interestForYear = remainingPrincipal * (interest / 100);
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
    }
    return armotizationTable;
  }

  return (
    <div>
      <h1>Calculation Result</h1>
      <p>Credit Sum: {calculation.principal}</p>
      <p>Interest Rate: {calculation.interest_rate}%</p>
      <p>Capital: {calculation.down_payment}</p>
      <p>Rent: {calculation.rent}</p>
      <p>Yearly Interest: {calculation.annual_percentage_rate}</p>
      <p>Calculated At: {new Date(calculation.created_at).toLocaleString()}</p>
      <button className="rounded-lg bg-purple-700 p-2 mt-4" onClick={calcTilgung}>Tilgungstabelle</button>
    </div>
  )
}
