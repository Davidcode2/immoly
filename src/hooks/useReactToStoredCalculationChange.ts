import { useEffect } from "react";
import { sondertilgungenAccessor } from "@/services/sondertilgungAccessor";
import { tilgungswechselAccessor } from "@/services/tilgungswechselAccessor";
import { calculationAccessor } from "@/services/calculationsAccessor";
import { CalculationDbo } from "@/lib/models/calculationDbo";
import { useBundeslandStore } from "@/store";
import calcTilgung from "@/lib/calculateArmotizaztionTable";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import { zinswechselAccessor } from "@/services/zinswechselAccessor";
import { SonderAmounts } from "@/lib/models/sonderamounts";

export default function useReactToStoredCalculationChange(
  principal: React.RefObject<number>,
  calculationId: string | null,
  bundeslandState: string,
  calcSummeNebenkosten: (principal: number, bundesland: string) => number,
  skipNextInputEffect: React.RefObject<boolean>,
  setInput: (value: CalculationDbo | null) => void,
  setTable: (table: ArmotizationEntry[] | null) => void,
  getSonderamounts: (calculationId: string, update: boolean) => Promise<SonderAmounts>
) {
  const updateBundesland = useBundeslandStore((state) => state.updateValue);

  const getFromBrowserStorage = (id: string) => {
    const calculation = calculationAccessor(id);
    if (!calculation) {
      return null;
    }
    calculation.sondertilgungen = sondertilgungenAccessor(id);
    calculation.tilgungswechsel = tilgungswechselAccessor(id);
    calculation.zinswechsel = zinswechselAccessor(id);
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
          const { sondertilgungen, tilgungswechsel, zinswechsel } = await getSonderamounts(calculationId, true);
          result.sondertilgungen = sondertilgungen;
          result.tilgungswechsel = tilgungswechsel;
          result.zinswechsel = zinswechsel;

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
