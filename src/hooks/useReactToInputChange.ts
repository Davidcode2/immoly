import { useEffect } from "react";
import CashRoiModel from "@/lib/models/cashRoiModel";

export default function useReactToInputChange(
  input: CashRoiModel | null,
  calculationId: string | null,
  nebenkostenActive: boolean,
  calcSummeNebenkosten: (principal: number) => number,
  principal: React.RefObject<number>,
  skipNextInputEffect: React.RefObject<boolean>,
  postToWorker: (input: CashRoiModel, nebenkosten: number) => void,
  addSonderAmountsToInput: (input: CashRoiModel, calculationId: string, update: boolean) => void
) {
  useEffect(() => {
    async function loadData() {
      if (!input) return;
      addSonderAmountsToInput(input, calculationId!, false);

      const nebenkosten = calcSummeNebenkosten(input.principal);
      principal.current = input.principal;

      postToWorker(input, nebenkosten);
    }

    if (skipNextInputEffect.current) {
      skipNextInputEffect.current = false;
      return; // skip recalculation caused by URL change
    }
    loadData();
  }, [input, nebenkostenActive]);
}
