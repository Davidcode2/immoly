'use client';
import CalculationResult from "./lib/models/CalculationResult";
import { deleteItem } from './lib/getCalculations';

export default function SingleGraph({ calculation }: { calculation: CalculationResult }) {

  const setCalcId = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('calculationId', calculation.id.toString());
    window.history.pushState({}, '', url);
  }

  const deleteSelectedItem = async () => {
    deleteItem(String(calculation.id));
  }

  return (
    <div className="rounded-md border border-purple-700 flex flex-col text-xs justify-between min-w-64">
      <button className="ml-auto px-2 text-amber-200" onClick={deleteSelectedItem}>x</button>
      <div className="px-4 pb-4">
        <div>
          <p>Investitionssumme: {calculation.principal.toLocaleString()}</p>
          <p>Zins: {calculation.interest_rate}%</p>
          <p>Eigenkapital: {calculation.down_payment.toLocaleString()}</p>
          <p>Monatliche Rate: {calculation.monthly_rate.toLocaleString()}</p>
          <p>Miete: {calculation.rent}</p>
          <p>Berechnet am: {new Date(calculation.created_at).toLocaleDateString()}</p>
        </div>
        <button className="rounded-lg bg-purple-700 p-2 mt-4" onClick={setCalcId}>Tilgungstabelle</button>
      </div>
    </div>
  )
}
