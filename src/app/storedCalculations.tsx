"use client";
import StoredScenario from "./storedScenario";
import { useEffect, useState } from "react";
import { CalculationDbo } from "./lib/models/calculationDbo";
import { calculationsAccessor } from "./services/calculationsAccessor";

export default function StoredCalculations() {
  const [calculations, setCalculations] = useState<CalculationDbo[]>([]);

  useEffect(() => {
    const calculations = calculationsAccessor();
    setCalculations(calculations);
  }, []);

  return (
    <div className="grid h-[800px] grid-rows-[1fr_auto_1fr] bg-[var(--light-accent)]/50">
      <div className="row-start-2 flex max-w-screen items-stretch gap-16 overflow-auto px-3 pb-3">
        {false ? (
          calculations.map((calcResult) => (
            <StoredScenario key={calcResult.id} calculation={calcResult} />
          ))
        ) : (
          <div className="mx-auto text-center text-[var(--foreground)]/70">
            <p className="mb-4 text-2xl">Keine gespeicherten Szenarien</p>
            <p className="text-lg">
              Berechne eine Immobilie und speichere dein Szenario, um es hier zu
              sehen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
