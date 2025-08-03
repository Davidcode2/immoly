"use client";
import CalculationResult from "./lib/models/CalculationResult";
import { deleteItem } from "./lib/calculationAccessor";

export default function SingleGraph({
  calculation,
}: {
  calculation: CalculationResult;
}) {
  const setCalcId = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("calculationId", calculation.id.toString());
    window.history.pushState({}, "", url);
  };

  const deleteSelectedItem = async () => {
    deleteItem(String(calculation.id));
  };

  return (
    <div className="flex min-w-64 flex-col justify-between dark:bg-neutral-800/30 shadow rounded-md text-xs backdrop-blur-lg">
      <button
        className="ml-auto px-2 text-red-300"
        onClick={deleteSelectedItem}
      >
        x
      </button>
      <div className="px-4 pb-4">
        <div>
          <p>Investitionssumme: {calculation.principal.toLocaleString()}</p>
          <p>Zins: {Number(calculation.interest_rate).toFixed(2)}%</p>
          <p>Eigenkapital: {calculation.down_payment.toLocaleString()}</p>
          <p>Monatliche Rate: {calculation.monthly_rate.toLocaleString()}</p>
          <p>Miete: {calculation.rent}</p>
          <p>
            Berechnet am:{" "}
            {new Date(calculation.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          className="mt-4 rounded-lg bg-purple-700 p-2"
          onClick={setCalcId}
        >
          Tilgungstabelle
        </button>
      </div>
    </div>
  );
}
