'use client';
import CalculationResult from "./lib/models/CalculationResult";

export default function SingleGraph({ calculation }: { calculation: CalculationResult }) {

  const setCalcId = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('calculationId', calculation.id.toString());
    window.history.pushState({}, '', url);
  }

  return (
    <div>
      <p>Investitionssumme: {calculation.principal.toLocaleString()}</p>
      <p>Zins: {calculation.interest_rate}%</p>
      <p>Eigenkapital: {calculation.down_payment.toLocaleString()}</p>
      <p>Monatliche Rate: {calculation.monthly_rate.toLocaleString()}</p>
      <p>Miete: {calculation.rent}</p>
      <p>Berechnet am: {new Date(calculation.created_at).toLocaleDateString()}</p>
      <button className="rounded-lg bg-purple-700 p-2 mt-4" onClick={setCalcId}>Tilgungstabelle</button>
    </div>
  )
}
