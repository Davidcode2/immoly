import { useEffect } from "react";
import CashRoiModel from "@/lib/models/cashRoiModel";
import SonderCacheHelper from "@/services/cacheHelper";
import { Sondertilgung } from "@/lib/models/sondertilgung";
import { Tilgungswechsel } from "@/lib/models/tilgungswechsel";

export default function useReactToInputChange(
  input: CashRoiModel | null,
  calculationId: string | null,
  nebenkostenActive: boolean,
  calcSummeNebenkosten: (principal: number) => number,
  principal: React.RefObject<number>,
  skipNextInputEffect: React.RefObject<boolean>,
  postToWorker: (input: CashRoiModel, nebenkosten: number) => void,
  sonderCacheHelper: SonderCacheHelper,
  sondertilgungenCache: Sondertilgung[],
  tilgungswechselCache: Tilgungswechsel[],
) {
  useEffect(() => {
    async function loadData() {
      if (!input) return;
      input.sondertilgungen = await sonderCacheHelper.getSondertilgungFromCache(
        calculationId!,
        sondertilgungenCache,
      );
      input.tilgungswechsel =
        await sonderCacheHelper.getTilgungswechselFromCache(
          calculationId!,
          tilgungswechselCache,
        );

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
