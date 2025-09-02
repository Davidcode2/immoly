"use client";
import { deleteItem } from "./lib/calculationAccessor";
import { CalculationDbo } from "./lib/models/calculationDbo";

export default function StoredScenario({
  calculation,
}: {
  calculation: CalculationDbo;
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
    <div className="flex min-w-[320px] flex-col h-fit rounded-lg bg-gradient-to-br from-[var(--background)] to-[var(--light-accent)]/5 p-6 shadow backdrop-blur-lg dark:bg-neutral-800/30">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs text-[var(--accent)] opacity-75">
          {new Date(calculation.created_at).toLocaleDateString()}
        </span>
        <button
          className="text-red-300 hover:text-red-400 transition-colors"
          onClick={deleteSelectedItem}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--accent)] mb-1">Investitionssumme</p>
              <p className="text-lg">{calculation.principal.toLocaleString()} €</p>
            </div>
            <div>
              <p className="text-xs text-[var(--accent)] mb-1">Eigenkapital</p>
              <p className="text-lg">{calculation.down_payment.toLocaleString()} €</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--accent)] mb-1">Monatliche Rate</p>
              <p className="text-lg">{calculation.monthly_rate.toLocaleString()} €</p>
            </div>
            <div>
              <p className="text-xs text-[var(--accent)] mb-1">Miete</p>
              <p className="text-lg">{calculation.rent} €</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[var(--accent)]/10 rounded-lg p-3 inline-block">
          <p className="text-xs text-[var(--accent)] mb-1">Zins</p>
          <p className="text-lg">{Number(calculation.interest_rate).toFixed(2)}%</p>
        </div>
      </div>

      <button
        className="mt-6 w-full rounded-lg bg-[var(--light-accent)] p-2 text-white 
                   shadow-md hover:bg-[var(--accent)]/90 transition-colors"
        onClick={setCalcId}
      >
        Szenario übernehmen
      </button>
    </div>
  );
}
