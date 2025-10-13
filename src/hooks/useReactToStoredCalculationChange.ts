import { useEffect } from "react";
import { sondertilgungenAccessor } from "@/services/sondertilgungAccessor";
import { tilgungswechselAccessor } from "@/services/tilgungswechselAccessor";
import { calculationAccessor } from "@/services/calculationsAccessor";
import { CalculationDbo } from "@/lib/models/calculationDbo";
import { useBundeslandStore } from "@/store";
import SonderCacheHelper from "@/services/cacheHelper";
import { Sondertilgung } from "@/lib/models/sondertilgung";
import { Tilgungswechsel } from "@/lib/models/tilgungswechsel";
import calcTilgung from "@/lib/calculateArmotizaztionTable";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";

export default function useReactToStoredCalculationChange(
  principal: React.RefObject<number>,
  calculationId: string | null,
  bundeslandState: string,
  sonderCacheHelper: SonderCacheHelper,
  calcSummeNebenkosten: (principal: number, bundesland: string) => number,
  sondertilgungenCache: Sondertilgung[],
  tilgungswechselCache: Tilgungswechsel[],
  skipNextInputEffect: React.RefObject<boolean>,
  setInput: (value: CalculationDbo | null) => void,
  setTable: (table: ArmotizationEntry[] | null) => void,
) {
  const updateBundesland = useBundeslandStore((state) => state.updateValue);

  const getFromBrowserStorage = (id: string) => {
    const calculation = calculationAccessor(id);
    if (!calculation) {
      return null;
    }
    const sondertilgungen = sondertilgungenAccessor(id);
    const tilgungswechsel = tilgungswechselAccessor(id);
    calculation.sondertilgungen = sondertilgungen;
    calculation.tilgungswechsel = tilgungswechsel;
    return calculation;
  };

  useEffect(() => {
    async function loadData() {
      if (calculationId) {
        try {
          const result = getFromBrowserStorage(calculationId);
          if (!result) {
            console.warn("No result found for calculationId:", calculationId);
            return;
          }
          principal.current = result.principal;
          // TODO use nebenkosten from storage
          const nebenkosten = calcSummeNebenkosten(
            result.principal,
            result.bundesland,
          );

          // reset cache
          const sondertilgungen =
            await sonderCacheHelper.getSondertilgungFromCache(
              calculationId!,
              sondertilgungenCache,
              true,
            );
          const tilgungswechsel =
            await sonderCacheHelper.getTilgungswechselFromCache(
              calculationId!,
              tilgungswechselCache,
              true,
            );
          result.sondertilgungen = sondertilgungen;
          result.tilgungswechsel = tilgungswechsel;

          /* skip the inputEffect to prevent duplicating the calculation */
          skipNextInputEffect.current = true;
          setInput(result);

          const tilgungungsTabelle = calcTilgung(result, nebenkosten);
          setTable(tilgungungsTabelle);

          /* update bundesland last to prevent jump in maklergebuehr value
           * which would be caused by an update to the table. Downstream components would then update
           * the nebenkosten with the old principal */
          //updateMaklergebuehr((result as CalculationDbo).maklerguehrPercentage);
          if (bundeslandState !== result.bundesland) {
            updateBundesland((result as CalculationDbo).bundesland);
            skipNextInputEffect.current = true;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadData();
  }, [calculationId]);
}
