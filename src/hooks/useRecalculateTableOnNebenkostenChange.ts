
import { RefObject, useEffect } from "react";
import type ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import type CashRoiModel from "@/lib/models/cashRoiModel";

interface UseRecalculateTableOnCostChangeProps {
  input: CashRoiModel | null;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  dependencies: any[];
  calcSummeNebenkosten: (principal: number) => number;
  principalRef: RefObject<number>;
  skipNextInputEffect: RefObject<boolean>;
  setTable: React.Dispatch<React.SetStateAction<ArmotizationEntry[] | null>>;
}

export function useRecalculateTableOnNebenkostenChange({
  input,
  dependencies,
  calcSummeNebenkosten,
  principalRef,
  skipNextInputEffect,
  setTable,
}: UseRecalculateTableOnCostChangeProps) {
  useEffect(() => {
    if (!input) return;
    if (skipNextInputEffect.current) {
      skipNextInputEffect.current = false;
      return;
    }

    const worker = new Worker(
      new URL("../workers/tilgungCalculation.worker.ts", import.meta.url),
    );

    worker.onmessage = (e) => {
      setTable(e.data);
      worker.terminate();
    };

    worker.postMessage({
      input,
      nebenkosten: calcSummeNebenkosten(principalRef.current),
    });

    return () => worker.terminate();
  }, [...dependencies]);
}

