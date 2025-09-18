"use client";
import { CalculationDbo } from "./lib/models/calculationDbo";
import { deleteCalculation } from "./services/calculationsAccessor";

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
    const res = deleteCalculation(calculation.id);
    if (!res) {
      alert("Fehler beim Löschen des Szenarios");
    }
  };

  return (
    <div className="flex h-fit min-w-[320px] flex-col rounded-lg bg-gradient-to-br from-[var(--background)] to-[var(--light-accent)]/5 p-6 shadow backdrop-blur-lg dark:bg-neutral-800/30">
      <div className="mb-4 flex items-start justify-between">
        <span className="text-xs text-[var(--accent)] opacity-75">
          {new Date(calculation.created_at).toLocaleDateString()}
        </span>
        <button
          className="text-red-300 transition-colors hover:text-red-400"
          onClick={deleteSelectedItem}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-xs text-[var(--accent)]">
                Investitionssumme
              </p>
              <p className="text-lg">
                {calculation.principal.toLocaleString("de") || 0} €
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs text-[var(--accent)]">Eigenkapital</p>
              <p className="text-lg">
                {calculation.down_payment.toLocaleString("de") || 0} €
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-xs text-[var(--accent)]">
                Monatliche Rate
              </p>
              <p className="text-lg">
                {calculation.monthly_rate.toLocaleString("de") || 0} €
              </p>
            </div>
            {calculation.rent != 0 && (
              <div>
                <p className="mb-1 text-xs text-[var(--accent)]">Miete</p>
                <p className="text-lg">{calculation.rent || 0} €</p>
              </div>
            )}
          </div>
        </div>

        <div className="inline-block rounded-lg bg-[var(--accent)]/10 p-3">
          <p className="mb-1 text-xs text-[var(--accent)]">Zins</p>
          <p className="text-lg">
            {Number(calculation.interest_rate).toLocaleString("de") || 0}%
          </p>
        </div>
      </div>

      <button
        className="mt-6 w-full cursor-pointer rounded-lg bg-[var(--light-accent)] p-2 text-white shadow-md transition-colors hover:bg-[var(--accent)]/90"
        onClick={setCalcId}
      >
        Szenario übernehmen
      </button>
    </div>
  );
}
