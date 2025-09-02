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
    <div className="h-[800px] bg-[var(--light-accent)]/50 grid grid-rows-[1fr_auto_1fr]">
      <div className="row-start-2 flex max-w-screen items-stretch gap-16 overflow-auto px-3 pb-3">
        {calculations &&
          calculations.map((calcResult) => (
            <StoredScenario key={calcResult.id} calculation={calcResult} />
          ))}
      </div>
    </div>
  );
}
