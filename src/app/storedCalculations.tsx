"use client";
import StoredScenario from "./storedScenario";
import { useEffect, useState } from "react";
import { CalculationDbo } from "./lib/models/calculationDbo";
import { calculationsAccessor } from "./services/calculationsAccessor";
import CenteredModal from "./components/centeredModal";
import { Check } from "lucide-react";

export default function StoredCalculations() {
  const [calculations, setCalculations] = useState<CalculationDbo[]>([]);
  const [showDeletedConfirmationModal, setShowDeletedConfirmationModal] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const updateCalculations = () => {
      const calculations = calculationsAccessor();
      setCalculations(calculations);
    };

    updateCalculations();

    const onStorage = () => updateCalculations();
    const onLocalStorage = () => updateCalculations();

    window.addEventListener("storage", onStorage);
    window.addEventListener("local-storage", onLocalStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("local-storage", onLocalStorage);
    };
  }, []);

  // Handle auto-close of modal with shrinking bar
  useEffect(() => {
    if (showDeletedConfirmationModal) {
      setProgress(100); // reset to full bar
      const duration = 2000; // 2 seconds
      const steps = 20; // how many updates
      const stepTime = duration / steps;
      let current = 100;

      const interval = setInterval(() => {
        current -= 100 / steps;
        setProgress(Math.max(current, 0));
      }, stepTime);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setShowDeletedConfirmationModal(false);
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [showDeletedConfirmationModal]);

  return (
    <div className="grid h-[800px] grid-rows-[1fr_auto_1fr] bg-[var(--light-accent)]/50">
      {showDeletedConfirmationModal && (
        <CenteredModal onClose={() => setShowDeletedConfirmationModal(false)}>
          <div className="z-40 mx-10 rounded-xl border border-slate-500/20 bg-radial-[at_50%_75%] from-[var(--primary)]/50 to-[var(--primary)]/40 pt-20 shadow-2xl sm:mx-0 md:w-[400px]">
            <div className="mx-20 flex gap-x-4 items-center">
              <Check size={72} />
              <div>Szenario gelöscht</div>
            </div>
            <div className="w-[97.5%] mx-auto pt-20">
              <div
                className="h-1 bg-[var(--secondary)] rounded-b-sm transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CenteredModal>
      )}
      <div className="row-start-2 mx-auto flex max-w-screen items-stretch gap-16 overflow-auto px-3 pb-3">
        {calculations && calculations.length > 0 ? (
          calculations.map((calcResult) => (
            <StoredScenario
              key={calcResult.id}
              calculation={calcResult}
              setShowDeletedConfirmationModal={setShowDeletedConfirmationModal}
            />
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

