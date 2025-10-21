import { useEffect } from "react";
import CashRoiModel from "@/lib/models/cashRoiModel";
import { SonderAmounts } from "@/lib/models/sonderamounts";

export default function useReactToInputChange(
  input: CashRoiModel | null,
  calculationId: string | null,
  nebenkostenActive: boolean,
  calcSummeNebenkosten: (principal: number) => number,
  principal: React.RefObject<number>,
  skipNextInputEffect: React.RefObject<boolean>,
  postToWorker: (input: CashRoiModel, nebenkosten: number) => void,
  getSonderamounts: (calculationId: string, update: boolean) => Promise<SonderAmounts>
) {
  useEffect(() => {
    async function loadData() {
      if (!input) return;
      const { sondertilgungen, tilgungswechsel, zinswechsel } = await getSonderamounts(calculationId!, false);
      input.sondertilgungen = sondertilgungen;
      input.tilgungswechsel = tilgungswechsel;
      input.zinswechsel = zinswechsel;

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
